import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'
import { listProductsFromDb } from '@/lib/db'
import { productSchema } from '@/lib/validations'
import { createProductDb } from '@/lib/products-write'

export async function GET() {
  const denied = await requireAdmin()
  if (denied) return denied
  try {
    const products = await listProductsFromDb(true)
    return NextResponse.json({ products })
  } catch {
    return NextResponse.json({ error: 'No se pudieron cargar los productos' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const denied = await requireAdmin()
  if (denied) return denied
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }
  const parsed = productSchema.safeParse(body)
  if (!parsed.success) {
    console.error('POST /api/admin/products 400:', JSON.stringify(parsed.error.flatten().fieldErrors))
    return NextResponse.json({ error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors }, { status: 400 })
  }
  try {
    const product = await createProductDb(parsed.data)
    return NextResponse.json({ product }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'No se pudo crear el producto' }, { status: 500 })
  }
}
