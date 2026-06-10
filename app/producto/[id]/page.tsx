import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ChevronRight, Truck, RotateCcw, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import { ProductCard } from '@/components/product-card'
import { AddToCart } from '@/components/add-to-cart'
import { getProduct, products, formatCOP } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  return {
    title: product ? `${product.name} | Blush Bar` : 'Producto | Blush Bar',
    description: product?.description,
  }
}

const guarantees = [
  { icon: Truck, text: 'Envio gratis +$150.000' },
  { icon: RotateCcw, text: 'Cambios en 30 dias' },
  { icon: ShieldCheck, text: 'Producto 100% original' },
]

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <main>
      <SiteHeader />
      <CartDrawer />

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Inicio
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/tienda" className="hover:text-primary">
            Tienda
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 md:grid-cols-2 md:px-8">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 md:py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              {product.brand}
            </p>
            <h1 className="mt-2 font-heading text-4xl md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 font-heading text-2xl">
              {formatCOP(product.price)}
            </p>
          </div>

          {product.shade && (
            <div>
              <p className="mb-2 text-sm font-medium">
                Tono: <span className="text-muted-foreground">{product.shade}</span>
              </p>
            </div>
          )}

          <p className="leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <AddToCart product={product} />

          <ul className="mt-2 flex flex-col gap-3 border-t border-border pt-6">
            {guarantees.map((g) => (
              <li key={g.text} className="flex items-center gap-3 text-sm">
                <g.icon className="h-5 w-5 text-primary" />
                {g.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
          <h2 className="mb-8 font-heading text-3xl">Tambien te puede gustar</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  )
}
