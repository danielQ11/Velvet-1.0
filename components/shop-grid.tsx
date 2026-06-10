'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
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
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.slug}
              onClick={() => setActive(f.slug)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === f.slug
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background hover:border-primary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Ordenar productos"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        >
          {sorters.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          No hay productos en esta categoría todavía.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
