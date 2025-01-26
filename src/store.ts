import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { Coupon, CouponResponseSchema, Product, ShoppingCart } from './schemas'

interface Store {
  total: number
  discount: number
  contents: ShoppingCart
  coupon: Coupon
  addToCart: (product: Product) => void
  updateQuantity: (id: Product['id'], quantity: number) => void
  removeFromCart: (id: Product['id']) => void
  calculateTotal: () => void
  applyCoupon: (couponName: string) => Promise<void>
  applyDiscount: () => void
  clearOrder: () => void
}

const initialState = {
  total: 0,
  discount: 0,
  contents: [],
  coupon: {
    percentage: 0,
    name: '',
    message: '',
  },
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    ...initialState,
    addToCart: (product) => {
      const { id: productId, categoryId, ...data } = product
      let contents: ShoppingCart = []
      const duplicated = get().contents.findIndex(
        (item) => item.productId === productId
      )
      if (duplicated >= 0) {
        if (
          get().contents[duplicated].quantity >=
          get().contents[duplicated].stock
        )
          return

        contents = get().contents.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      } else {
        contents = [
          /**
           * Get. toma contents del state
           */
          ...get().contents,
          {
            ...data,
            quantity: 1,
            productId,
          },
        ]
      }

      /**
       * Set. actualiza contents en el state
       */
      set(() => ({
        contents,
      }))
      get().calculateTotal()
    },

    updateQuantity: (id, quantity) => {
      /**
       * Actualiza la cantidad de un producto en el carrito
       * @param id id del producto
       * @param quantity cantidad a actualizar
       * @returns void
       */

      /**
       * Set. actualiza contents en el state
       */
      set((state) => ({
        contents: state.contents.map((item) =>
          item.productId === id ? { ...item, quantity } : item
        ),
      }))
      get().calculateTotal()
    },

    removeFromCart: (id) => {
      /**
       * Elimina un producto del carrito
       * @param id id del producto
       * @returns void
       */

      set((state) => ({
        contents: state.contents.filter((item) => item.productId !== id),
      }))

      if (!get().contents.length) {
        get().clearOrder()
      }

      get().calculateTotal()
    },

    calculateTotal: () => {
      /**
       * Calcula el total de la venta
       * @returns void
       */

      set((state) => ({
        total: state.contents.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      }))

      if (get().coupon.percentage) {
        get().applyDiscount()
      }
    },

    applyCoupon: async (couponName) => {
      /**
       * Aplica un cupón de descuento
       * @param couponName nombre del cupón
       * @returns void
       */

      const response = await fetch(`/coupons/api`, {
        method: 'POST',
        body: JSON.stringify({ coupon_name: couponName }),
      })
      const json = await response.json()
      const coupon = CouponResponseSchema.parse(json)

      set(() => ({ coupon }))

      if (coupon.percentage) {
        get().applyDiscount()
      }
    },

    applyDiscount: () => {
      const { total: subTotal, coupon } = get()
      const discount = (coupon.percentage / 100) * subTotal
      const total = subTotal - discount

      set(() => ({ discount, total }))
    },

    clearOrder: () => {
      set(() => ({ ...initialState }))
    },
  }))
)
