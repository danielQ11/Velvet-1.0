import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ChevronRight, Truck, RotateCcw, ShieldCheck, Star } from 'lucide-react'
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
    title: product ? `${product.name} | Velvet` : 'Producto | Velvet',
    description: product?.description,
  }
}

const guarantees = [
  { icon: Truck, text: 'Envío gratis +$150.000' },
  { icon: RotateCcw, text: 'Cambios en 30 días' },
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

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-28 md:px-8 md:pt-32">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            Inicio
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/tienda" className="transition-colors hover:text-primary">
            Tienda
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product detail */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 md:grid-cols-2 md:px-8">
        {/* Image */}
        <div className="relative">
          <div className="artistic-frame relative aspect-square overflow-hidden rounded-3xl bg-muted">
            <Image
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            {/* Badge */}
            {(product.bestSeller || product.isNew) && (
              <span className={`absolute left-5 top-5 ${product.isNew ? 'badge-new' : 'badge-gold'}`}>
                {product.isNew ? 'Nuevo' : 'Best Seller'}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6 md:py-6">
          <div>
            <div className="divider-star mb-4 max-w-xs text-[10px]">
              <span>{product.brand.toUpperCase()}</span>
            </div>
            <h1 className="font-heading text-4xl leading-tight md:text-5xl">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <p className="font-heading text-2xl text-primary">
                {formatCOP(product.price)}
              </p>
              <div className="flex gap-0.5 text-gold">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">(24 reseñas)</span>
            </div>
          </div>

          {product.shade && (
            <div>
              <p className="mb-2 text-sm font-medium">
                Tono: <span className="text-muted-foreground">{product.shade}</span>
              </p>
            </div>
          )}

          <p className="text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <AddToCart product={product} />

          {/* Guarantees */}
          <ul className="mt-2 flex flex-col gap-3.5 border-t border-border/40 pt-6">
            {guarantees.map((g) => (
              <li key={g.text} className="flex items-center gap-3 text-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/50">
                  <g.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground">{g.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-secondary/20 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-10 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">✦</p>
              <h2 className="font-heading text-3xl md:text-4xl">También te puede gustar</h2>
            </div>
            <div className="stagger-children grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  )
}
