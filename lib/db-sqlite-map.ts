import type { Product } from './products'

type Row = {
  id: string
  name: string
  brand: string
  price: number
  category: string
  categoryLabel: string
  image: string
  shade: string | null
  description: string
  bestSeller: number
  isNew: number
  stock: number
  active: number
}

export function rowToProduct(r: Row): Product {
  return {
    id: r.id,
    name: r.name,
    brand: r.brand,
    price: Number(r.price),
    category: r.category as Product['category'],
    categoryLabel: r.categoryLabel,
    image: r.image,
    shade: r.shade ?? undefined,
    description: r.description,
    bestSeller: r.bestSeller === 1,
    isNew: r.isNew === 1,
    stock: Number(r.stock ?? 0),
    active: r.active === 1,
  }
}
