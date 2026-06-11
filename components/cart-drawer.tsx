'use client'

import { X, Minus, Plus, ShoppingBag, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/cart-context'
import { Button } from '@/components/ui/button'
import { formatCOP } from '@/lib/products'

const FREE_SHIPPING = 150000

export function CartDrawer() {
  const { items, isOpen, setOpen, updateQuantity, removeItem, subtotal } =
    useCart()

  const remaining = Math.max(0, FREE_SHIPPING - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-400 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-xl">Tu carrito</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-accent/50"
            aria-label="Cerrar carrito"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/40">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-heading text-lg">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Descubre productos increíbles en nuestra tienda
              </p>
            </div>
            <Button onClick={() => setOpen(false)} className="btn-premium rounded-full px-6 text-white" asChild>
              <Link href="/tienda">Explorar productos</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Shipping progress */}
            <div className="border-b border-border/40 px-6 py-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gold" />
                <p className="text-xs text-muted-foreground">
                  {remaining > 0 ? (
                    <>
                      Te faltan{' '}
                      <span className="font-semibold text-foreground">
                        {formatCOP(remaining)}
                      </span>{' '}
                      para envío gratis
                    </>
                  ) : (
                    <span className="font-semibold text-primary">
                      ¡Tienes envío gratis! ✦
                    </span>
                  )}
                </p>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: progress >= 100
                      ? 'linear-gradient(90deg, var(--primary), var(--gold))'
                      : 'var(--primary)',
                  }}
                />
              </div>
            </div>

            {/* Items */}
            <ul className="flex-1 divide-y divide-border/30 overflow-y-auto px-6">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 py-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {product.name}
                        </p>
                        {product.shade && (
                          <p className="mt-0.5 text-[11px] text-muted-foreground">
                            {product.shade}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        aria-label="Eliminar"
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border/60 bg-background">
                        <button
                          className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:bg-accent"
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          aria-label="Disminuir"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-medium">
                          {quantity}
                        </span>
                        <button
                          className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:bg-accent"
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          aria-label="Aumentar"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-heading text-sm">
                        {formatCOP(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t border-border/40 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading text-lg">
                  {formatCOP(subtotal)}
                </span>
              </div>
              <Link
                href="/carrito"
                onClick={() => setOpen(false)}
                className="btn-premium flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold uppercase tracking-wider text-white"
              >
                Ver carrito y pagar
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="mt-3 w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
