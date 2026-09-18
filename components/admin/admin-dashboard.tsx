'use client'

import { useEffect, useMemo, useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatCOP, type Product } from '@/lib/products'

export function AdminDashboard({ email }: { email: string }) {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'No se pudieron cargar')
        return
      }
      setProducts(data.products)
    } catch {
      setError('Error de red')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter((p) =>
      [p.name, p.brand, p.category, p.categoryLabel, p.id].join(' ').toLowerCase().includes(q),
    )
  }, [products, query])

  async function logout() {
    await signOut({ callbackUrl: '/admin/login' })
  }

  async function toggleActive(p: Product) {
    setToggling(p.id)
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !(p.active ?? true) }),
      })
      if (!res.ok) return
      const data = await res.json()
      setProducts((prev) => prev.map((x) => (x.id === p.id ? data.product : x)))
    } finally {
      setToggling(null)
    }
  }

  async function removeProduct(p: Product) {
    const ok = window.confirm(`¿Eliminar "${p.name}"? Esta acción no se puede deshacer.`)
    if (!ok) return
    setDeleting(p.id)
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: 'DELETE' })
      if (!res.ok) return
      setProducts((prev) => prev.filter((x) => x.id !== p.id))
    } finally {
      setDeleting(null)
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-28 md:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">✦ Panel</p>
          <h1 className="font-heading text-4xl">Productos</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sesión: {email} · {products.length} productos</p>
        </div>
        <div className="flex gap-2">
          <Link href="/"><Button variant="outline">Ver tienda</Button></Link>
          <Link href="/admin/productos/nuevo"><Button>Agregar producto</Button></Link>
          <Button variant="outline" onClick={logout}>Salir</Button>
        </div>
      </div>

      <div className="mb-4 max-w-sm">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre, marca, categoría…" />
      </div>

      {loading && <p className="py-12 text-center text-muted-foreground">Cargando productos…</p>}
      {error && <p className="py-6 text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-2xl border border-border/60 bg-white/70">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-3">Producto</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Estado</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const visible = p.active ?? true
                return (
                  <tr key={p.id} className="border-b border-border/40 last:border-0">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image || '/placeholder.svg'} alt="" className="h-12 w-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium leading-tight">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.brand} · {p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{formatCOP(p.price)}</td>
                    <td className="p-3">{p.category} / {p.categoryLabel}</td>
                    <td className="p-3">{p.stock ?? 0}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${visible ? 'bg-green-100 text-green-800' : 'bg-muted text-muted-foreground'}`}>
                        {visible ? 'Visible' : 'Oculto'}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" disabled={toggling === p.id} onClick={() => toggleActive(p)}>
                          {visible ? 'Desactivar' : 'Activar'}
                        </Button>
                        <Link href={`/admin/productos/${p.id}`}><Button size="sm" variant="outline">Editar</Button></Link>
                        <Button size="sm" variant="destructive" disabled={deleting === p.id} onClick={() => removeProduct(p)}>
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="p-8 text-center text-muted-foreground">Sin resultados.</p>}
        </div>
      )}
    </main>
  )
}
