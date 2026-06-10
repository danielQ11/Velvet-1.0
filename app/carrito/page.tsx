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
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <h1 className="mb-8 font-heading text-4xl md:text-5xl">Tu carrito</h1>
        <CartView />
      </div>
      <SiteFooter />
    </main>
  )
}
