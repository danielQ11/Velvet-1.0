'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingBag, Heart } from 'lucide-react'
import type { Product } from '@/lib/products'
import { formatCOP } from '@/lib/products'
import { useCart } from '@/components/cart-context'
import { Button } from '@/components/ui/button'

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-border">
          <button
            className="grid h-10 w-10 place-items-center"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Disminuir cantidad"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center">{qty}</span>
          <button
            className="grid h-10 w-10 place-items-center"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Aumentar cantidad"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <span className="text-sm text-muted-foreground">
          Disponible
        </span>
      </div>
      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1"
          onClick={() => addItem(product, qty)}
        >
          <ShoppingBag className="mr-1 h-4 w-4" /> Agregar al carrito
        </Button>
        <Button size="lg" variant="outline" aria-label="Agregar a favoritos">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
