import { z } from 'zod'

export const categoriesEnum = z.enum(['maquillaje', 'skincare', 'herramientas'])

export const productSchema = z.object({
  name: z.string().trim().min(2, 'Mínimo 2 caracteres').max(120),
  brand: z.string().trim().min(1).max(60).default('Velvet'),
  price: z.coerce.number().int('Debe ser entero').min(0, 'No puede ser negativo').max(100_000_000),
  category: categoriesEnum,
  categoryLabel: z.string().trim().min(1).max(60),
  image: z.string().trim().max(2000).default(''),
  shade: z.string().trim().max(80).optional().or(z.literal('')),
  description: z.string().trim().min(4, 'Mínimo 4 caracteres').max(2000),
  bestSeller: z.coerce.boolean().default(false),
  isNew: z.coerce.boolean().default(false),
  stock: z.coerce.number().int().min(0).max(1_000_000).default(0),
  active: z.coerce.boolean().default(true),
})

export const productUpdateSchema = z.object({
  name: z.string().trim().min(2, 'Mínimo 2 caracteres').max(120).optional(),
  brand: z.string().trim().min(1).max(60).optional(),
  price: z.number().int('Debe ser entero').min(0, 'No puede ser negativo').max(100_000_000).optional(),
  category: categoriesEnum.optional(),
  categoryLabel: z.string().trim().min(1).max(60).optional(),
  image: z.string().trim().max(2000).optional(),
  shade: z.string().trim().max(80).optional().or(z.literal('')).optional(),
  description: z.string().trim().min(4, 'Mínimo 4 caracteres').max(2000).optional(),
  bestSeller: z.boolean().optional(),
  isNew: z.boolean().optional(),
  stock: z.number().int().min(0).max(1_000_000).optional(),
  active: z.boolean().optional(),
})

export const loginSchema = z.object({
  email: z.string().trim().email('Correo inválido').max(160),
  password: z.string().min(1, 'Requerida').max(200),
})

export type ProductInput = z.infer<typeof productSchema>
