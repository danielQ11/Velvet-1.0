import type { Product } from './products'
import { products as seedProducts } from './products'
import { hasMongo, getProductsCollection } from './mongo'

// ── Mongo (Vercel / producción) ─────────────────────────────────
type MongoDoc = Record<string, unknown> & { id: string }

function mongoToProduct(d: MongoDoc): Product {
  return {
    id: String(d.id),
    name: String(d.name ?? ''),
    brand: String(d.brand ?? 'Velvet'),
    price: Number(d.price ?? 0),
    category: d.category as Product['category'],
    categoryLabel: String(d.categoryLabel ?? ''),
    image: String(d.image ?? ''),
    shade: (d.shade as string) || undefined,
    description: String(d.description ?? ''),
    bestSeller: d.bestSeller === true,
    isNew: d.isNew === true,
    stock: Number(d.stock ?? 0),
    active: d.active !== false,
  }
}

async function seedMongoIfEmpty() {
  const col = await getProductsCollection()
  const count = await col.countDocuments()
  if (count > 0) return
  await col.insertMany(
    seedProducts.map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      category: p.category,
      categoryLabel: p.categoryLabel,
      image: p.image,
      shade: p.shade ?? null,
      description: p.description,
      bestSeller: !!p.bestSeller,
      isNew: !!p.isNew,
      stock: p.stock ?? 0,
      active: p.active ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  )
}

// ── SQLite local (solo cuando no hay MONGODB_URI) ───────────────
async function sqliteList(includeInactive: boolean): Promise<Product[]> {
  const { DatabaseSync } = await import('node:sqlite')
  const fs = await import('node:fs')
  const path = await import('node:path')
  const dbPath = path.join(process.cwd(), 'data', 'velvet.db')
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
  const db = new DatabaseSync(dbPath)
  try {
    db.exec(`CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, brand TEXT NOT NULL DEFAULT 'Velvet',
      price INTEGER NOT NULL, category TEXT NOT NULL, categoryLabel TEXT NOT NULL,
      image TEXT NOT NULL DEFAULT '', shade TEXT, description TEXT NOT NULL DEFAULT '',
      bestSeller INTEGER NOT NULL DEFAULT 0, isNew INTEGER NOT NULL DEFAULT 0,
      stock INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')), updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    )`)
    const count = (db.prepare('SELECT COUNT(*) as c FROM products').get() as { c: number }).c
    if (count === 0) {
      const stmt = db.prepare(`INSERT INTO products (id,name,brand,price,category,categoryLabel,image,shade,description,bestSeller,isNew,stock,active) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      for (const p of seedProducts) {
        stmt.run(p.id, p.name, p.brand, p.price, p.category, p.categoryLabel, p.image, p.shade ?? null, p.description, p.bestSeller ? 1 : 0, p.isNew ? 1 : 0, p.stock ?? 0, p.active ?? true ? 1 : 0)
      }
    }
    const rows = (includeInactive
      ? db.prepare('SELECT * FROM products ORDER BY rowid DESC').all()
      : db.prepare('SELECT * FROM products WHERE active = 1 ORDER BY rowid DESC').all()) as Array<Record<string, never>>
    const { rowToProduct } = await import('./db-sqlite-map')
    return (rows as never[]).map((r) => rowToProduct(r as never))
  } finally {
    db.close()
  }
}

async function sqliteGet(id: string): Promise<Product | undefined> {
  const { DatabaseSync } = await import('node:sqlite')
  const path = await import('node:path')
  const db = new DatabaseSync(path.join(process.cwd(), 'data', 'velvet.db'))
  try {
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as never | undefined
    if (!row) return undefined
    const { rowToProduct } = await import('./db-sqlite-map')
    return rowToProduct(row)
  } finally {
    db.close()
  }
}

// ── API pública (async) ─────────────────────────────────────────
export async function listProductsFromDb(includeInactive = false): Promise<Product[]> {
  if (hasMongo()) {
    await seedMongoIfEmpty()
    const col = await getProductsCollection()
    const filter = includeInactive ? {} : { active: true }
    const docs = await col.find(filter).sort({ _id: -1 }).limit(500).toArray()
    return docs.map((d) => mongoToProduct(d as unknown as MongoDoc))
  }
  return sqliteList(includeInactive)
}

export async function getProductFromDb(id: string): Promise<Product | undefined> {
  if (hasMongo()) {
    await seedMongoIfEmpty()
    const col = await getProductsCollection()
    const doc = await col.findOne({ id })
    return doc ? mongoToProduct(doc as unknown as MongoDoc) : undefined
  }
  return sqliteGet(id)
}

export { mongoToProduct }
