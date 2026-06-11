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
    name: 'Tinte Labial Velvet',
    brand: 'Velvet',
    price: 34000,
    category: 'maquillaje',
    categoryLabel: 'Labios',
    image: 'https://imgproxy.treinta.co/sig/size:640:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2F95d47337-b46d-5101-a0a3-6ccb7d83d110.jpeg',
    shade: 'Rosa Pétalo',
    bestSeller: true,
    description:
      'Tinte labial de acabado aterciopelado y larga duración. Color intenso que se siente ligero y nutre los labios durante todo el día.',
  },
  {
    id: 'blush-rubor',
    name: 'Rubor en Polvo Luminoso',
    brand: 'Velvet',
    price: 39000,
    category: 'maquillaje',
    categoryLabel: 'Rostro',
    image: 'https://imgproxy.treinta.co/sig/size:1080:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2Fb71bc34d-5ad5-546e-9571-6578bc0cc9ef.jpeg',
    shade: 'Rosa Durazno',
    bestSeller: true,
    description:
      'Rubor en polvo de alta pigmentación con acabado luminoso natural. Se difumina fácilmente para un rubor saludable y radiante.',
  },
  {
    id: 'serum-vitamina-c',
    name: 'Sérum Vitamina C Iluminador',
    brand: 'Velvet Skin',
    price: 85000,
    category: 'skincare',
    categoryLabel: 'Tratamiento',
    image: 'https://imgproxy.treinta.co/sig/size:640:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2Fe56bd5ee-914c-55b5-9c86-e60ed35c59ea.jpeg',
    isNew: true,
    description:
      'Sérum antioxidante con vitamina C estabilizada que ilumina, unifica el tono y reduce manchas para una piel visiblemente más radiante.',
  },
  {
    id: 'foundation-mate',
    name: 'Base Líquida Acabado Natural',
    brand: 'Velvet',
    price: 65000,
    category: 'maquillaje',
    categoryLabel: 'Rostro',
    image: 'https://imgproxy.treinta.co/sig/size:1080:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2F05d058d8-ba81-5049-898f-267f2d62fee5.jpeg',
    shade: 'Tono Neutro 3',
    description:
      'Base de cobertura media a alta con acabado natural. Fórmula transpirable que se funde con la piel para un look impecable.',
  },
  {
    id: 'mascara-volumen',
    name: 'Máscara de Pestañas Volumen Extremo',
    brand: 'Velvet',
    price: 34000,
    category: 'maquillaje',
    categoryLabel: 'Ojos',
    image: 'https://imgproxy.treinta.co/sig/size:1080:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2F49d90ca6-371d-57a7-adba-9de9fdf4b3f9.png',
    shade: 'Negro Intenso',
    bestSeller: true,
    description:
      'Pestañas con volumen y definición desde la primera pasada. Cepillo moldeador que separa y curva sin grumos.',
  },
  {
    id: 'paleta-sombras',
    name: 'Paleta de Sombras Nude & Rosé',
    brand: 'Velvet',
    price: 84000,
    category: 'maquillaje',
    categoryLabel: 'Ojos',
    image: 'https://imgproxy.treinta.co/sig/size:1080:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2F0f55f5eb-7d82-5019-bbe3-7ba0074cf999.jpeg',
    isNew: true,
    description:
      'Doce tonos en acabados mate y satinados pensados para crear desde looks naturales hasta sofisticados con tonos rosados y nude.',
  },
  {
    id: 'crema-hidratante',
    name: 'Crema Hidratante con Ceramidas',
    brand: 'Velvet Skin',
    price: 98000,
    category: 'skincare',
    categoryLabel: 'Hidratación',
    image: 'https://imgproxy.treinta.co/sig/size:1080:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2Fb32b5649-361e-5b33-87c9-0c1b1ceb980d.jpeg',
    description:
      'Hidratación profunda pero ligera con ácido hialurónico y ceramidas. Deja la piel suave, jugosa y preparada para el maquillaje.',
  },
  {
    id: 'lip-gloss',
    name: 'Brillo Labial Espejo Luminoso',
    brand: 'Velvet',
    price: 38000,
    category: 'maquillaje',
    categoryLabel: 'Labios',
    image: 'https://imgproxy.treinta.co/sig/size:1080:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2F034edb7b-0e03-5bbe-bc2d-4fa0856f8a9b.webp',
    shade: 'Rosa Brillante',
    description:
      'Brillo labial no pegajoso con destellos sutiles que aportan volumen y un acabado espejo super luminoso.',
  },
]

export const categories = [
  {
    slug: 'maquillaje',
    name: 'Maquillaje',
    description: 'Labios, rostro y ojos',
    image: '/my images/imagen1.jpeg',
  },
  {
    slug: 'skincare',
    name: 'Skincare',
    description: 'Tratamiento e hidratacion',
    image: '/my images/image3.jpeg',
  },
  {
    slug: 'herramientas',
    name: 'Herramientas',
    description: 'Brochas y accesorios',
    image: '/my images/image4.jpeg',
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
