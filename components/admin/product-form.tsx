'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Product } from '@/lib/products'

const CATEGORIES = [
  { value: 'maquillaje', label: 'Maquillaje' },
  { value: 'skincare', label: 'Skincare' },
  { value: 'herramientas', label: 'Herramientas' },
] as const

const LABELS: Record<string, string> = {
  maquillaje: 'Labios',
  skincare: 'Tratamiento',
  herramientas: 'Accesorios',
}

type Props = {
  initial?: Product | null
  mode: 'create' | 'edit'
}

export function ProductForm({ initial, mode }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    brand: initial?.brand ?? 'Velvet',
    price: String(initial?.price ?? ''),
    category: initial?.category ?? 'maquillaje',
    categoryLabel: initial?.categoryLabel ?? 'Labios',
    image: initial?.image ?? '',
    shade: initial?.shade ?? '',
    description: initial?.description ?? '',
    stock: String(initial?.stock ?? 0),
    active: initial?.active ?? true,
    bestSeller: initial?.bestSeller ?? false,
    isNew: initial?.isNew ?? false,
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => {
      const next = { ...f, [key]: value }
      if (key === 'category' && !initial) {
        next.categoryLabel = LABELS[value as string] ?? next.categoryLabel
      }
      return next
    })
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'No se pudo subir la imagen')
        return
      }
      set('image', data.url)
    } catch {
      setError('Error subiendo imagen')
    } finally {
      setUploading(false)
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = {
        name: form.name.trim(),
        brand: form.brand.trim() || 'Velvet',
        price: Number(form.price),
        category: form.category,
        categoryLabel: form.categoryLabel.trim(),
        image: form.image.trim(),
        shade: form.shade.trim(),
        description: form.description.trim(),
        stock: Number(form.stock),
        active: form.active,
        bestSeller: form.bestSeller,
        isNew: form.isNew,
      }
      const url = mode === 'create' ? '/api/admin/products' : `/api/admin/products/${initial!.id}`
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        const details = data.details ? Object.values(data.details).flat().join(' ') : ''
        setError(`${data.error || 'Error al guardar'} ${details}`.trim())
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Error de red')
    } finally {
      setSaving(false)
    }
  }

  const inputCls = 'mt-1'

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-border/60 bg-white/70 p-6 md:grid-cols-2">
      <div className="md:col-span-2">
        <h2 className="font-heading text-2xl">{mode === 'create' ? 'Agregar producto' : 'Editar producto'}</h2>
        <p className="text-sm text-muted-foreground">Completa los datos y guarda. Aparecerá automáticamente en la tienda.</p>
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="name">Nombre *</label>
        <Input id="name" required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ej: Labial mate rosa" className={inputCls} />
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="brand">Marca</label>
        <Input id="brand" value={form.brand} onChange={(e) => set('brand', e.target.value)} className={inputCls} />
      </div>

      <div className="md:col-span-2">
        <label className="text-sm font-medium" htmlFor="description">Descripción *</label>
        <textarea id="description" required minLength={4} value={form.description} onChange={(e) => set('description', e.target.value)}
          rows={4} placeholder="Describe el producto, beneficios, modo de uso… (mínimo 4 caracteres)"
          className="mt-1 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring" />
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="price">Precio (COP) *</label>
        <Input id="price" required type="number" min={0} step={1} value={form.price} onChange={(e) => set('price', e.target.value)} className={inputCls} />
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="stock">Stock</label>
        <Input id="stock" type="number" min={0} step={1} value={form.stock} onChange={(e) => set('stock', e.target.value)} className={inputCls} />
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="category">Categoría *</label>
        <select id="category" value={form.category} onChange={(e) => set('category', e.target.value as typeof form.category)}
          className="mt-1 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none">
          {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="categoryLabel">Etiqueta (ej: Labios, Rostro)</label>
        <Input id="categoryLabel" value={form.categoryLabel} onChange={(e) => set('categoryLabel', e.target.value)} className={inputCls} />
      </div>

      <div className="md:col-span-2">
        <label className="text-sm font-medium">Imagen</label>
        <div className="mt-1 flex flex-col gap-3 rounded-lg border border-dashed border-border p-4 sm:flex-row sm:items-center">
          {form.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.image} alt="Vista previa" className="h-24 w-24 rounded-lg object-cover" />
          ) : (
            <div className="grid h-24 w-24 place-items-center rounded-lg bg-muted text-xs text-muted-foreground">Sin imagen</div>
          )}
          <div className="flex flex-1 flex-col gap-2">
            <Input value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="Pega URL https://… o sube un archivo" />
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onFile} disabled={uploading}
              className="text-sm text-muted-foreground" />
            <p className="text-xs text-muted-foreground">JPG, PNG o WEBP. Máximo 3MB. Se guarda en el servidor.</p>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="shade">Tono (opcional)</label>
        <Input id="shade" value={form.shade} onChange={(e) => set('shade', e.target.value)} placeholder="Ej: Rosa Pétalo" className={inputCls} />
      </div>
      <div className="flex flex-wrap items-end gap-5">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} className="h-4 w-4" /> Visible en tienda</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.bestSeller} onChange={(e) => set('bestSeller', e.target.checked)} className="h-4 w-4" /> Best Seller</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isNew} onChange={(e) => set('isNew', e.target.checked)} className="h-4 w-4" /> Nuevo</label>
      </div>

      {error && <p className="md:col-span-2 text-sm text-red-600">{error}</p>}

      <div className="flex gap-2 md:col-span-2">
        <Button type="submit" disabled={saving || uploading}>
          {saving ? 'Guardando…' : mode === 'create' ? 'Guardar producto' : 'Guardar cambios'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin')}>Cancelar</Button>
      </div>
    </form>
  )
}
