import { create } from 'zustand'
import { Product, ShoppingCart } from './schemas'
import { devtools } from 'zustand/middleware'

interface Store {
  total: number
  contents: ShoppingCart
  addToCart: (product: Product) => void
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    total: 0,
    contents: [],
    addToCart: (product) => {},
  }))
)
