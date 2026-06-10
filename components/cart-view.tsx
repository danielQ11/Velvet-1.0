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
      <div className="flex flex-col items-center gap-5 py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        <div>
          <h2 className="font-heading text-2xl">Tu carrito esta vacio</h2>
          <p className="mt-2 text-muted-foreground">
            Descubre nuestros productos favoritos de la comunidad.
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/tienda">Explorar la tienda</Link>
        </Button>
      </div>
    )
  }

  const shipping = subtotal >= FREE_SHIPPING ? 0 : 12000
  const total = subtotal + shipping

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {items.length} producto{items.length > 1 ? 's' : ''}
          </p>
          <button
            onClick={clear}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Vaciar carrito
          </button>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-4 py-5">
              <Link
                href={`/producto/${product.id}`}
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-muted"
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
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {product.brand}
                    </p>
                    <Link
                      href={`/producto/${product.id}`}
                      className="font-medium hover:text-primary"
                    >
                      {product.name}
                    </Link>
                    {product.shade && (
                      <p className="text-sm text-muted-foreground">
                        {product.shade}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    aria-label="Eliminar producto"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      className="grid h-8 w-8 place-items-center"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      aria-label="Disminuir"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm">{quantity}</span>
                    <button
                      className="grid h-8 w-8 place-items-center"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      aria-label="Aumentar"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-medium">
                    {formatCOP(product.price * quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link
          href="/tienda"
          className="mt-6 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Seguir comprando
        </Link>
      </div>

      <aside className="h-fit rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading text-xl">Resumen del pedido</h2>
        <dl className="mt-5 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd>{formatCOP(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Envio</dt>
            <dd>{shipping === 0 ? 'Gratis' : formatCOP(shipping)}</dd>
          </div>
          <div className="my-1 border-t border-border" />
          <div className="flex justify-between text-base font-medium">
            <dt>Total</dt>
            <dd className="font-heading text-lg">{formatCOP(total)}</dd>
          </div>
        </dl>
        <Button size="lg" className="mt-6 w-full">
          Finalizar compra <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Impuestos incluidos. Envio calculado al finalizar.
        </p>
      </aside>
    </div>
  )
}
