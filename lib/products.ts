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
    name: 'Aceite reparador de puntas con cannabis La Receta',
    brand: 'Velvet',
    price: 34000,
    category: 'maquillaje',
    categoryLabel: 'Labios',
    image: 'https://imgproxy.treinta.co/sig/size:640:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2F95d47337-b46d-5101-a0a3-6ccb7d83d110.jpeg',
    shade: 'Rosa Pétalo',
    bestSeller: true,
    description:
      'Aceite reparador enriquecido con extracto de cannabis que nutre y sella las puntas dañadas. Aporta brillo, suavidad y control del frizz sin dejar sensación grasosa.',
  },
  {
    id: 'blush-rubor',
    name: 'Bronzer stick Atenea',
    brand: 'Velvet',
    price: 39000,
    category: 'maquillaje',
    categoryLabel: 'Rostro',
    image: 'https://imgproxy.treinta.co/sig/size:1080:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2Fb71bc34d-5ad5-546e-9571-6578bc0cc9ef.jpeg',
    shade: 'Rosa Durazno',
    bestSeller: true,
    description:
      'Bronceador en barra de fácil aplicación que esculpe y da calidez al rostro. Textura cremosa y blendeable para un bronceado natural y luminoso.',
  },
  {
    id: 'serum-vitamina-c',
    name: 'Agua micelar Garnier',
    brand: 'Velvet Skin',
    price: 14500,
    category: 'skincare',
    categoryLabel: 'Tratamiento',
    image: 'https://imgproxy.treinta.co/sig/size:640:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2Fe56bd5ee-914c-55b5-9c86-e60ed35c59ea.jpeg',
    isNew: true,
    description:
      'Agua micelar que limpia, desmaquilla y tonifica en un solo paso. Fórmula suave sin enjuague que respeta el equilibrio natural de la piel.',
  },
  {
    id: 'foundation-mate',
    name: 'Bálsamo labial Vogue',
    brand: 'Velvet',
    price: 9500,
    category: 'maquillaje',
    categoryLabel: 'Rostro',
    image: 'https://imgproxy.treinta.co/sig/size:1080:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2F05d058d8-ba81-5049-898f-267f2d62fee5.jpeg',
    shade: 'Tono Neutro 3',
    description:
      'Bálsamo labial hidratante que protege y suaviza los labios con una capa de color sutil. Fórmula nutritiva con vitamina E para labios tersos todo el día.',
  },
  {
    id: 'mascara-volumen',
    name: 'Barra Capilar anti-frizz olé',
    brand: 'Velvet',
    price: 34000,
    category: 'maquillaje',
    categoryLabel: 'Ojos',
    image: 'https://imgproxy.treinta.co/sig/size:1080:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2F49d90ca6-371d-57a7-adba-9de9fdf4b3f9.png',
    shade: 'Negro Intenso',
    bestSeller: true,
    description:
      'Barra capilar anti-frizz que controla el encrespamiento y alisa al instante. Fórmula compacta ideal para retoques rápidos con acabado liso y sedoso.',
  },
  {
    id: 'paleta-sombras',
    name: 'Barra capilar color-in olé',
    brand: 'Velvet',
    price: 34000,
    category: 'maquillaje',
    categoryLabel: 'Ojos',
    image: 'https://imgproxy.treinta.co/sig/size:1080:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2F0f55f5eb-7d82-5019-bbe3-7ba0074cf999.jpeg',
    isNew: true,
    description:
      'Barra capilar con pigmentos de color que cubre canas y raíces al instante. Práctica y portátil, ideal para retoques de color sobre la marcha.',
  },
  {
    id: 'crema-hidratante',
    name: 'Crema Hidratante con Ceramidas',
    brand: 'Velvet Skin',
    price: 30000,
    category: 'skincare',
    categoryLabel: 'Hidratación',
    image: 'https://imgproxy.treinta.co/sig/size:1080:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2Fb32b5649-361e-5b33-87c9-0c1b1ceb980d.jpeg',
    description:
      'Hidratación profunda pero ligera con ácido hialurónico y ceramidas. Deja la piel suave, jugosa y preparada para el maquillaje.',
  },
  {
    id: 'lip-gloss',
    name: 'Base 1st scene 30 ml Atenea',
    brand: 'Velvet',
    price: 38000,
    category: 'maquillaje',
    categoryLabel: 'Labios',
    image: 'https://imgproxy.treinta.co/sig/size:1080:::/quality:90/plain/https%3A%2F%2Fus-east-1-prod-treinta-assets-bucket.s3.amazonaws.com%2F034edb7b-0e03-5bbe-bc2d-4fa0856f8a9b.webp',
    shade: 'Rosa Brillante',
    description:
      'Base líquida de cobertura media con acabado natural y luminoso. Fórmula de 30 ml que unifica el tono, hidrata y se funde con la piel para un look impecable.',
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
