import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'
import { storeImage } from '@/lib/products-write'

const MAX_BYTES = 3 * 1024 * 1024
const ALLOWED: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
}

export async function POST(req: Request) {
  const denied = await requireAdmin()
  if (denied) return denied
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Formulario inválido' }, { status: 400 })
  }
  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Falta el archivo (file)' }, { status: 400 })
  }
  if (!ALLOWED[file.type]) {
    return NextResponse.json({ error: 'Solo JPG, PNG o WEBP' }, { status: 400 })
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Máximo 3MB' }, { status: 400 })
  }
  const bytes = Buffer.from(await file.arrayBuffer())
  if (bytes.length < 12) {
    return NextResponse.json({ error: 'Archivo vacío' }, { status: 400 })
  }
  try {
    // En Vercel/Mongo se guarda en la colección `images` y se sirve vía /api/images/[id].
    // En local sin Mongo se guarda en public/uploads/.
    const url = await storeImage(bytes, file.type)
    return NextResponse.json({ url }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'No se pudo guardar la imagen' }, { status: 500 })
  }
}
