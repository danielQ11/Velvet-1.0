import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import { ShopGrid } from '@/components/shop-grid'
import { listProductsFromDb } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Tienda | Velvet',
  description: 'Explora todo el catálogo de maquillaje y skincare de Velvet.',
}

export default async function ShopPage() {
  const initialProducts = await listProductsFromDb(false)
  return (
    <main>
      <SiteHeader />
      <CartDrawer />

      {/* Shop header */}
      <section className="hero-gradient sparkle-field relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <span className="absolute left-[15%] top-[30%] text-gold opacity-40" style={{ fontSize: 14, animation: 'sparkle-pulse 3s ease-in-out infinite' }}>✦</span>
          <span className="absolute right-[20%] top-[40%] text-gold opacity-30" style={{ fontSize: 10, animation: 'sparkle-pulse 3s ease-in-out 1.2s infinite' }}>✦</span>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-28 md:px-8 md:pb-18 md:pt-32">
          <div className="divider-star mb-4 max-w-xs text-[10px]">
            <span>TIENDA</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl">
            Todos los productos
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Maquillaje y cuidado de la piel seleccionados para ti, con amor y dedicación.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <Suspense fallback={null}>
          <ShopGrid initialProducts={initialProducts} />
        </Suspense>
      </div>

      <SiteFooter />
    </main>
  )
}
