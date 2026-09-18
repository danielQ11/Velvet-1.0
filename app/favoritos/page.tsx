'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import { ProductCard } from '@/components/product-card'
import { useFavorites } from '@/components/favorites-context'
import type { Product } from '@/lib/products'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => setProducts(d.products ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const saved = products.filter((p) => favorites.includes(p.id))

  return (
    <main>
      <SiteHeader />
      <CartDrawer />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 md:px-8 md:pt-32">
        <div className="mb-10">
          <div className="divider-star mb-4 max-w-xs text-[10px]">
            <span>MIS FAVORITOS</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl">Tus favoritos</h1>
          <p className="mt-4 text-muted-foreground">
            {loading ? 'Cargando…' : saved.length === 0 ? 'Toca el corazón en un producto para guardarlo aquí.' : `${saved.length} producto${saved.length !== 1 ? 's' : ''} guardado${saved.length !== 1 ? 's' : ''}.`}
          </p>
        </div>
        {!loading && saved.length > 0 && (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {saved.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
        {!loading && saved.length === 0 && (
          <Link href="/tienda" className="btn-premium inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white">
            Explorar la tienda
          </Link>
        )}
      </div>
      <SiteFooter />
    </main>
  )
}
