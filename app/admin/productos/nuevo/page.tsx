import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { ProductForm } from '@/components/admin/product-form'

export default async function NewProductPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')
  return (
    <main className="mx-auto max-w-3xl px-4 py-28 md:px-8">
      <Link href="/admin" className="mb-4 inline-block text-sm text-muted-foreground hover:text-primary">← Volver a productos</Link>
      <ProductForm mode="create" />
    </main>
  )
}
