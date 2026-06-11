import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import { CartView } from '@/components/cart-view'

export const metadata: Metadata = {
  title: 'Carrito | Velvet',
  description: 'Revisa los productos de tu carrito y finaliza tu compra.',
}

export default function CartPage() {
  return (
    <main>
      <SiteHeader />
      <CartDrawer />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 md:px-8 md:pt-32">
        <div className="mb-10">
          <div className="divider-star mb-4 max-w-xs text-[10px]">
            <span>MI CARRITO</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl">Tu carrito</h1>
        </div>
        <CartView />
      </div>
      <SiteFooter />
    </main>
  )
}
