'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '@/lib/products'
import { formatCOP } from '@/lib/products'
import { useCart } from '@/components/cart-context'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group flex flex-col">
      <Link
        href={`/producto/${product.id}`}
        className="relative block aspect-square overflow-hidden rounded-lg bg-muted"
      >
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {(product.bestSeller || product.isNew) && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground backdrop-blur">
            {product.isNew ? 'Nuevo' : 'Best Seller'}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault()
            addItem(product)
          }}
          className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          aria-label={`Agregar ${product.name} al carrito`}
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </Link>
      <div className="mt-3 flex flex-col gap-1">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {product.categoryLabel}
        </p>
        <Link
          href={`/producto/${product.id}`}
          className="text-sm font-medium leading-tight hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="text-sm text-foreground/80">{formatCOP(product.price)}</p>
      </div>
    </div>
  )
}
