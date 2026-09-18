import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { requireAdmin } from '@/lib/admin-guard'
import { getProductFromDb } from '@/lib/db'
import { productUpdateSchema } from '@/lib/validations'
import { updateProductDb, deleteProductDb } from '@/lib/products-write'

function removeLocalUploadedFile(imageUrl: string) {
  if (!imageUrl.startsWith('/uploads/')) return
  try {
    const file = path.join(process.cwd(), 'public', imageUrl.replace('/uploads/', 'uploads/').split('?')[0])
    if (fs.existsSync(file)) fs.unlinkSync(file)
  } catch {
    // best-effort (en Mongo la limpieza la hace deleteProductDb)
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied
  const { id } = await params
  const product = await getProductFromDb(id)
  if (!product) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json({ product })
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied
  const { id } = await params
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }
  const parsed = productUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors }, { status: 400 })
  }
  const before = await getProductFromDb(id)
  if (!before) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  try {
    const product = await updateProductDb(id, parsed.data)
    if (parsed.data.image !== undefined && before.image !== parsed.data.image) {
      removeLocalUploadedFile(before.image)
    }
    return NextResponse.json({ product })
  } catch {
    return NextResponse.json({ error: 'No se pudo actualizar' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied
  const { id } = await params
  const image = await deleteProductDb(id)
  if (image === null) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  removeLocalUploadedFile(image)
  return NextResponse.json({ ok: true })
}
