import { NextResponse } from 'next/server'
import { getStoredImage } from '@/lib/products-write'

// Público: sirve imágenes guardadas en Mongo (colección `images`).
// En local sin Mongo, los archivos se sirven directo desde /public/uploads.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!/^[a-f0-9]{24}$/.test(id)) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }
  const img = await getStoredImage(id)
  if (!img) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return new NextResponse(new Uint8Array(img.buffer), {
    headers: {
      'Content-Type': img.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
