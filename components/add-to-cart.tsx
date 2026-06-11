'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingBag, Heart } from 'lucide-react'
import type { Product } from '@/lib/products'
import { useCart } from '@/components/cart-context'
import { Button } from '@/components/ui/button'

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <div className="flex items-center rounded-full border border-border/60 bg-background">
          <button
            className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-accent"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Disminuir cantidad"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium">{qty}</span>
          <button
            className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-accent"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Aumentar cantidad"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-sm text-muted-foreground">Disponible</span>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => addItem(product, qty)}
          className="btn-premium flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold uppercase tracking-wider text-white"
        >
          <ShoppingBag className="h-4 w-4" /> Agregar al carrito
        </button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full border-border/60 px-4 hover:border-primary hover:bg-primary/5"
          aria-label="Agregar a favoritos"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
