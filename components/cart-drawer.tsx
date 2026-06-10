'use client'

import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
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
      <div
        className={`fixed inset-0 z-50 bg-foreground/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Carrito de compras"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-heading text-xl">Tu carrito</h2>
          <button onClick={() => setOpen(false)} aria-label="Cerrar carrito">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">Tu carrito esta vacio</p>
            <Button onClick={() => setOpen(false)} asChild>
              <Link href="/tienda">Explorar productos</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-5 py-4">
              <p className="text-xs text-muted-foreground">
                {remaining > 0 ? (
                  <>
                    Te faltan{' '}
                    <span className="font-medium text-foreground">
                      {formatCOP(remaining)}
                    </span>{' '}
                    para envio gratis
                  </>
                ) : (
                  <span className="font-medium text-primary">
                    Tienes envio gratis
                  </span>
                )}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
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
                          <p className="text-xs text-muted-foreground">
                            {product.shade}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        aria-label="Eliminar"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          className="grid h-7 w-7 place-items-center"
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          aria-label="Disminuir"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm">
                          {quantity}
                        </span>
                        <button
                          className="grid h-7 w-7 place-items-center"
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          aria-label="Aumentar"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-medium">
                        {formatCOP(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading text-lg">
                  {formatCOP(subtotal)}
                </span>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="/carrito" onClick={() => setOpen(false)}>
                  Ver carrito y pagar
                </Link>
              </Button>
              <button
                onClick={() => setOpen(false)}
                className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-foreground"
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
