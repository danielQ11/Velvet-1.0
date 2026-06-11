'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/products'

const filters = [
  { slug: 'todos', label: 'Todos' },
  { slug: 'maquillaje', label: 'Maquillaje' },
  { slug: 'skincare', label: 'Skincare' },
  { slug: 'herramientas', label: 'Herramientas' },
]

const sorters = [
  { value: 'destacados', label: 'Destacados' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
]

export function ShopGrid() {
  const searchParams = useSearchParams()
  const initial = searchParams.get('categoria') ?? 'todos'
  const [active, setActive] = useState(initial)
  const [sort, setSort] = useState('destacados')

  const visible = useMemo(() => {
    let list =
      active === 'todos'
        ? [...products]
        : products.filter((p) => p.category === active)
    if (sort === 'precio-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'precio-desc') list.sort((a, b) => b.price - a.price)
    return list
  }, [active, sort])

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.slug}
              onClick={() => setActive(f.slug)}
              className={`rounded-full border px-5 py-2 text-[12px] font-medium uppercase tracking-wider transition-all duration-300 ${
                active === f.slug
                  ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'border-border/60 bg-background hover:border-primary/50 hover:shadow-sm'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Ordenar productos"
            className="rounded-full border border-border/60 bg-background px-4 py-2 text-[12px] font-medium uppercase tracking-wider focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {sorters.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-gold text-xs">✦</span>
        <p className="text-xs text-muted-foreground">
          {visible.length} producto{visible.length !== 1 ? 's' : ''}
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <span className="text-gold text-2xl">✦</span>
          <p className="text-muted-foreground">
            No hay productos en esta categoría todavía.
          </p>
        </div>
      ) : (
        <div className="stagger-children grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
