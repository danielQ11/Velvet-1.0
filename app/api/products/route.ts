import { NextResponse } from 'next/server'
import { listProductsFromDb } from '@/lib/db'

// Público: solo productos activos para la tienda
export async function GET() {
  try {
    const products = await listProductsFromDb(false)
    return NextResponse.json({ products })
  } catch {
    return NextResponse.json({ error: 'No se pudieron cargar los productos' }, { status: 500 })
  }
}
