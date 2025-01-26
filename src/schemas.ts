import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.coerce.number(),
  stock: z.number(),
  categoryId: z.number(),
})

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const CategoriesResponseSchema = z.array(CategorySchema)

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
  products: z.array(ProductSchema),
})

/** Shopping Cart */
const ShoppingCartContentSchema = ProductSchema.pick({
  name: true,
  image: true,
  price: true,
  stock: true,
}).extend({
  productId: z.number(),
  quantity: z.number(),
})

export const ShoppingCartSchema = z.array(ShoppingCartContentSchema)

export type Product = z.infer<typeof ProductSchema>
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>
export type CartItem = z.infer<typeof ShoppingCartContentSchema>
