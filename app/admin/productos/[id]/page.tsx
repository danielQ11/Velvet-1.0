import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { getProductFromDb } from '@/lib/db'
import { ProductForm } from '@/components/admin/product-form'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) redirect('/admin/login')
  const { id } = await params
  const product = await getProductFromDb(id)
  if (!product) notFound()
  return (
    <main className="mx-auto max-w-3xl px-4 py-28 md:px-8">
      <Link href="/admin" className="mb-4 inline-block text-sm text-muted-foreground hover:text-primary">← Volver a productos</Link>
      <ProductForm mode="edit" initial={product} />
    </main>
  )
}
