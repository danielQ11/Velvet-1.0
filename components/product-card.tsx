'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Heart } from 'lucide-react'
import type { Product } from '@/lib/products'
import { formatCOP } from '@/lib/products'
import { useCart } from '@/components/cart-context'
import { useFavorites } from '@/components/favorites-context'
import { cn } from '@/lib/utils'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toggle, isFav } = useFavorites()
  const fav = isFav(product.id)

  return (
    <div className="group flex flex-col animate-fade-up">
      <Link
        href={`/producto/${product.id}`}
        className="product-glow relative block aspect-[3/4] overflow-hidden rounded-2xl bg-muted"
      >
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Top gradient overlay */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-foreground/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Badges */}
        {(product.bestSeller || product.isNew) && (
          <span className={`absolute left-3 top-3 ${product.isNew ? 'badge-new' : 'badge-gold'}`}>
            {product.isNew ? 'Nuevo' : 'Best Seller'}
          </span>
        )}

        {/* Action buttons */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            className={cn(
              'grid h-9 w-9 place-items-center rounded-full shadow-md backdrop-blur transition-all duration-300',
              fav
                ? 'bg-red-500 text-white opacity-100'
                : 'translate-x-2 bg-background/90 text-foreground/60 opacity-0 hover:bg-red-500 hover:text-white group-hover:translate-x-0 group-hover:opacity-100 max-md:translate-x-0 max-md:opacity-100',
            )}
            aria-label={fav ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
            aria-pressed={fav}
            onClick={(e) => { e.preventDefault(); toggle(product.id) }}
          >
            <Heart className={cn('h-4 w-4', fav && 'fill-current')} />
          </button>
        </div>

        {/* Add to cart button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            addItem(product)
          }}
          className="absolute bottom-3 left-3 right-3 flex translate-y-3 items-center justify-center gap-2 rounded-xl bg-foreground/90 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-background opacity-0 shadow-lg backdrop-blur transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary max-md:translate-y-0 max-md:opacity-100"
          aria-label={`Agregar ${product.name} al carrito`}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Agregar
        </button>
      </Link>

      <div className="mt-4 flex flex-col gap-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {product.categoryLabel}
        </p>
        <Link
          href={`/producto/${product.id}`}
          className="text-sm font-medium leading-snug transition-colors duration-300 hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="font-heading text-base text-foreground">
          {formatCOP(product.price)}
        </p>
      </div>
    </div>
  )
}
