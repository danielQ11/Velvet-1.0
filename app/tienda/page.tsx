import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import { ShopGrid } from '@/components/shop-grid'

export const metadata: Metadata = {
  title: 'Tienda | Blush Bar',
  description: 'Explora todo el catálogo de maquillaje y skincare de Blush Bar.',
}

export default function ShopPage() {
  return (
    <main>
      <SiteHeader />
      <CartDrawer />
      <section className="border-b border-border bg-accent/40">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">
            Tienda
          </p>
          <h1 className="mt-2 font-heading text-4xl md:text-5xl">
            Todos los productos
          </h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            Maquillaje y cuidado de la piel seleccionados para ti.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <Suspense fallback={null}>
          <ShopGrid />
        </Suspense>
      </div>
      <SiteFooter />
    </main>
  )
}
