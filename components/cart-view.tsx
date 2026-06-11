'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { Button } from '@/components/ui/button'
import { formatCOP } from '@/lib/products'

const FREE_SHIPPING = 150000

export function CartView() {
  const { items, updateQuantity, removeItem, subtotal, clear } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-24 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/40">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <div>
          <h2 className="font-heading text-2xl">Tu carrito está vacío</h2>
          <p className="mt-2 text-muted-foreground">
            Descubre nuestros productos favoritos de la comunidad.
          </p>
        </div>
        <Link
          href="/tienda"
          className="btn-premium inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white"
        >
          Explorar la tienda
        </Link>
      </div>
    )
  }

  const shipping = subtotal >= FREE_SHIPPING ? 0 : 12000
  const total = subtotal + shipping

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
      <div>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gold text-xs">✦</span>
            <p className="text-sm text-muted-foreground">
              {items.length} producto{items.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={clear}
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            Vaciar carrito
          </button>
        </div>

        <ul className="divide-y divide-border/30 border-y border-border/30">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-5 py-6">
              <Link
                href={`/producto/${product.id}`}
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-muted transition-shadow hover:shadow-md"
              >
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      {product.brand}
                    </p>
                    <Link
                      href={`/producto/${product.id}`}
                      className="mt-0.5 font-medium leading-snug transition-colors hover:text-primary"
                    >
                      {product.name}
                    </Link>
                    {product.shade && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {product.shade}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    aria-label="Eliminar producto"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-border/60 bg-background">
                    <button
                      className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-accent"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      aria-label="Disminuir"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-medium">{quantity}</span>
                    <button
                      className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-accent"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      aria-label="Aumentar"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-heading text-base">
                    {formatCOP(product.price * quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/tienda"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          ← Seguir comprando
        </Link>
      </div>

      {/* Order summary */}
      <aside className="glass-card h-fit rounded-3xl p-7 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-gold text-sm">✦</span>
          <h2 className="font-heading text-xl">Resumen del pedido</h2>
        </div>
        <dl className="mt-6 flex flex-col gap-3.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-medium">{formatCOP(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Envío</dt>
            <dd className="font-medium">{shipping === 0 ? <span className="text-primary">Gratis ✦</span> : formatCOP(shipping)}</dd>
          </div>
          <div className="my-1 border-t border-border/40" />
          <div className="flex justify-between text-base">
            <dt className="font-medium">Total</dt>
            <dd className="font-heading text-xl">{formatCOP(total)}</dd>
          </div>
        </dl>
        <button className="btn-premium mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold uppercase tracking-wider text-white">
          Finalizar compra <ArrowRight className="h-4 w-4" />
        </button>
        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Impuestos incluidos. Envío calculado al finalizar.
        </p>
      </aside>
    </div>
  )
}
