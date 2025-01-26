import { create } from 'zustand'
import { Product, ShoppingCart } from './schemas'
import { devtools } from 'zustand/middleware'

interface Store {
  total: number
  contents: ShoppingCart
  addToCart: (product: Product) => void
  updateQuantity: (id: Product['id'], quantity: number) => void
  removeFromCart: (id: Product['id']) => void
  calculateTotal: () => void
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    total: 0,
    contents: [],
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
    },
  }))
)
