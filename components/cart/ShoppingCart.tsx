'use client'

import { useStore } from '@/src/store'
import ShoppingCartItem from './ShoppingCartItem'
import Amount from './Amount'
import { formatCurrency } from '../../src/utils'
import CouponForm from './CouponForm'

export default function ShoppingCart() {
  const contents = useStore((state) => state.contents)
  const total = useStore((state) => state.total)
  const discount = useStore((state) => state.discount)

  return (
    <>
      {contents.length ? (
        <>
          <h2 className='text-4xl font-bold text-gray-900'>Resumen de Venta</h2>
          <ul
            role='list'
            className='mt-6 divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500'
          >
            {contents.map((item) => (
              <ShoppingCartItem key={item.productId} item={item} />
            ))}
          </ul>
          <dl className='space-y-6 border-t border-gray-300 py-6 text-sm font-medium text-gray-500'>
            {discount ? (
              <Amount
                label='Descuento'
                amount={formatCurrency(discount)}
                discount={true}
              />
            ) : null}

            <Amount label='Total a Pagar' amount={formatCurrency(total)} />
          </dl>
          <CouponForm />
        </>
      ) : (
        <p className='text-xl text-center text-gray-900'>
          No hay productos en el carrito
        </p>
      )}
    </>
  )
}
