import type { Product } from '@/lib/products'
import type { ProductInput } from '@/lib/validations'
import { hasMongo, getProductsCollection, getImagesCollection } from '@/lib/mongo'
import { mongoToProduct } from '@/lib/db'
import { rowToProduct } from '@/lib/db-sqlite-map'
import { ObjectId } from 'mongodb'

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50) || 'producto'
}

export function generateId(name: string): string {
  const base = slugify(name)
  const suffix = Date.now().toString(36).slice(-4) + Math.random().toString(36).slice(2, 6)
  return `${base}-${suffix}`
}

function toDoc(id: string, data: ProductInput) {
  return {
    id,
    name: data.name,
    brand: data.brand || 'Velvet',
    price: data.price,
    category: data.category,
    categoryLabel: data.categoryLabel,
    image: data.image || '',
    shade: data.shade || null,
    description: data.description,
    bestSeller: !!data.bestSeller,
    isNew: !!data.isNew,
    stock: data.stock ?? 0,
    active: data.active ?? true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

async function sqliteWrite<T>(fn: (db: never) => T): Promise<T> {
  const { DatabaseSync } = await import('node:sqlite')
  const path = await import('node:path')
  const db = new DatabaseSync(path.join(process.cwd(), 'data', 'velvet.db'))
  try {
    return fn(db as never)
  } finally {
    db.close()
  }
}

export async function createProductDb(data: ProductInput): Promise<Product> {
  const id = generateId(data.name)
  if (hasMongo()) {
    const col = await getProductsCollection()
    await col.insertOne(toDoc(id, data))
    const doc = await col.findOne({ id })
    return mongoToProduct(doc as never)
  }
  return sqliteWrite((db: never) => {
    const d = db as unknown as {
      prepare: (s: string) => { run: (...a: unknown[]) => void; get: (...a: unknown[]) => never }
    }
    d.prepare(`INSERT INTO products (id,name,brand,price,category,categoryLabel,image,shade,description,bestSeller,isNew,stock,active) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
      id, data.name, data.brand || 'Velvet', data.price, data.category, data.categoryLabel,
      data.image || '', data.shade || null, data.description,
      data.bestSeller ? 1 : 0, data.isNew ? 1 : 0, data.stock ?? 0, data.active ?? true ? 1 : 0,
    )
    return rowToProduct(d.prepare('SELECT * FROM products WHERE id = ?').get(id))
  })
}

export async function updateProductDb(id: string, data: Partial<ProductInput>): Promise<Product | null> {
  if (hasMongo()) {
    const col = await getProductsCollection()
    const current = await col.findOne({ id })
    if (!current) return null
    const set: Record<string, unknown> = { updatedAt: new Date() }
    for (const k of ['name', 'brand', 'price', 'category', 'categoryLabel', 'image', 'description', 'stock'] as const) {
      if (data[k] !== undefined) set[k] = data[k]
    }
    if (data.shade !== undefined) set.shade = data.shade || null
    if (data.bestSeller !== undefined) set.bestSeller = !!data.bestSeller
    if (data.isNew !== undefined) set.isNew = !!data.isNew
    if (data.active !== undefined) set.active = !!data.active
    if (Object.keys(set).length > 1) await col.updateOne({ id }, { $set: set })
    const doc = await col.findOne({ id })
    return doc ? mongoToProduct(doc as never) : null
  }
  return sqliteWrite((db: never) => {
    const d = db as unknown as {
      prepare: (s: string) => { run: (...a: unknown[]) => void; get: (...a: unknown[]) => never; all: (...a: unknown[]) => never[] }
    }
    const current = d.prepare('SELECT * FROM products WHERE id = ?').get(id) as Record<string, unknown> | undefined
    if (!current) return null
    const fields: string[] = []
    const values: unknown[] = []
    const map: Record<string, string> = {
      name: 'name', brand: 'brand', price: 'price', category: 'category',
      categoryLabel: 'categoryLabel', image: 'image', shade: 'shade',
      description: 'description', bestSeller: 'bestSeller', isNew: 'isNew',
      stock: 'stock', active: 'active',
    }
    for (const [key, colName] of Object.entries(map)) {
      if ((data as Record<string, unknown>)[key] !== undefined) {
        let v = (data as Record<string, unknown>)[key]
        if (key === 'bestSeller' || key === 'isNew' || key === 'active') v = v ? 1 : 0
        if (key === 'shade' && (v === '' || v == null)) v = null
        fields.push(`${colName} = ?`)
        values.push(v)
      }
    }
    if (fields.length === 0) return rowToProduct(d.prepare('SELECT * FROM products WHERE id = ?').get(id))
    fields.push(`updatedAt = datetime('now')`)
    values.push(id)
    d.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`).run(...values)
    return rowToProduct(d.prepare('SELECT * FROM products WHERE id = ?').get(id))
  })
}

export async function deleteProductDb(id: string): Promise<string | null> {
  if (hasMongo()) {
    const col = await getProductsCollection()
    const doc = await col.findOne({ id })
    if (!doc) return null
    await col.deleteOne({ id })
    const image = String((doc as Record<string, unknown>).image || '')
    await deleteImageIfStored(image)
    return image
  }
  return sqliteWrite((db: never) => {
    const d = db as unknown as {
      prepare: (s: string) => { run: (...a: unknown[]) => void; get: (...a: unknown[]) => { image: string } | undefined }
    }
    const row = d.prepare('SELECT image FROM products WHERE id = ?').get(id)
    if (!row) return null
    d.prepare('DELETE FROM products WHERE id = ?').run(id)
    return row.image || ''
  })
}

export async function storeImage(buffer: Buffer, contentType: string): Promise<string> {
  if (hasMongo()) {
    const col = await getImagesCollection()
    const r = await col.insertOne({ data: buffer.toString('base64'), contentType, createdAt: new Date() })
    return `/api/images/${r.insertedId.toString()}`
  }
  const fs = await import('node:fs')
  const path = await import('node:path')
  const crypto = await import('node:crypto')
  const ext = contentType === 'image/png' ? '.png' : contentType === 'image/webp' ? '.webp' : '.jpg'
  const dir = path.join(process.cwd(), 'public', 'uploads')
  fs.mkdirSync(dir, { recursive: true })
  const name = `${crypto.randomUUID()}${ext}`
  fs.writeFileSync(path.join(dir, name), buffer)
  return `/uploads/${name}`
}

export async function getStoredImage(id: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  if (!hasMongo()) return null
  try {
    const col = await getImagesCollection()
    const doc = await col.findOne({ _id: new ObjectId(id) })
    if (!doc) return null
    const d = doc as unknown as { data: string; contentType: string }
    return { buffer: Buffer.from(d.data, 'base64'), contentType: d.contentType }
  } catch {
    return null
  }
}

async function deleteImageIfStored(imageUrl: string) {
  const m = imageUrl.match(/^\/api\/images\/([a-f0-9]{24})$/)
  if (!m || !hasMongo()) return
  try {
    const col = await getImagesCollection()
    await col.deleteOne({ _id: new ObjectId(m[1]) })
  } catch {
    // best-effort
  }
}
