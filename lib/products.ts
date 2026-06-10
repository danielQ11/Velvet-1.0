export type Product = {
  id: string
  name: string
  brand: string
  price: number
  category: 'maquillaje' | 'skincare' | 'herramientas'
  categoryLabel: string
  image: string
  shade?: string
  description: string
  bestSeller?: boolean
  isNew?: boolean
}

export const products: Product[] = [
  {
    id: 'lip-tint-rosa',
    name: 'Lip Tint Velvet',
    brand: 'Velvet',
    price: 68000,
    category: 'maquillaje',
    categoryLabel: 'Labios',
    image: '/products/lip-tint.png',
    shade: 'Rosa Petalo',
    bestSeller: true,
    description:
      'Tinte labial de acabado aterciopelado y larga duracion. Color intenso que se siente ligero y nutre los labios durante todo el dia.',
  },
  {
    id: 'blush-rubor',
    name: 'Rubor en Polvo Glow',
    brand: 'Velvet',
    price: 82000,
    category: 'maquillaje',
    categoryLabel: 'Rostro',
    image: '/products/blush.png',
    shade: 'Rosa Durazno',
    bestSeller: true,
    description:
      'Rubor en polvo de alta pigmentacion con acabado luminoso natural. Difumina facilmente para un rubor saludable y radiante.',
  },
  {
    id: 'serum-vitamina-c',
    name: 'Serum Vitamina C',
    brand: 'Velvet Skin',
    price: 124000,
    category: 'skincare',
    categoryLabel: 'Tratamiento',
    image: '/products/serum.png',
    isNew: true,
    description:
      'Serum antioxidante con vitamina C estabilizada que ilumina, unifica el tono y reduce manchas para una piel visiblemente mas radiante.',
  },
  {
    id: 'foundation-mate',
    name: 'Base Liquida Second Skin',
    brand: 'Velvet',
    price: 138000,
    category: 'maquillaje',
    categoryLabel: 'Rostro',
    image: '/products/foundation.png',
    shade: 'Tono Neutro 3',
    description:
      'Base de cobertura media a alta con acabado natural. Formula transpirable que se funde con la piel para un look impecable.',
  },
  {
    id: 'mascara-volumen',
    name: 'Mascara Volumen Extremo',
    brand: 'Velvet',
    price: 74000,
    category: 'maquillaje',
    categoryLabel: 'Ojos',
    image: '/products/mascara.png',
    shade: 'Negro Intenso',
    bestSeller: true,
    description:
      'Pestanas con volumen y definicion desde la primera pasada. Cepillo moldeador que separa y curva sin grumos.',
  },
  {
    id: 'paleta-sombras',
    name: 'Paleta de Sombras Bare',
    brand: 'Velvet',
    price: 156000,
    category: 'maquillaje',
    categoryLabel: 'Ojos',
    image: '/products/palette.png',
    isNew: true,
    description:
      'Doce tonos en acabados mate y satinados pensados para crear desde looks naturales hasta sofisticados con tonos rosados y nude.',
  },
  {
    id: 'crema-hidratante',
    name: 'Crema Hidratante Dewy',
    brand: 'Velvet Skin',
    price: 98000,
    category: 'skincare',
    categoryLabel: 'Hidratacion',
    image: '/products/cream.png',
    description:
      'Hidratacion ligera con acido hialuronico y ceramidas. Deja la piel suave, jugosa y preparada para el maquillaje.',
  },
  {
    id: 'lip-gloss',
    name: 'Lip Gloss Shimmer',
    brand: 'Velvet',
    price: 58000,
    category: 'maquillaje',
    categoryLabel: 'Labios',
    image: '/products/gloss.png',
    shade: 'Rosa Brillante',
    description:
      'Brillo labial no pegajoso con destellos sutiles que aportan volumen y un acabado espejo luminoso.',
  },
]

export const categories = [
  {
    slug: 'maquillaje',
    name: 'Maquillaje',
    description: 'Labios, rostro y ojos',
    image: '/category-makeup.png',
  },
  {
    slug: 'skincare',
    name: 'Skincare',
    description: 'Tratamiento e hidratacion',
    image: '/category-skincare.png',
  },
  {
    slug: 'herramientas',
    name: 'Herramientas',
    description: 'Brochas y accesorios',
    image: '/category-tools.png',
  },
]

export function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
