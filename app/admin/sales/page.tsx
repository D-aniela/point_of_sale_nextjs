import React from 'react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { format } from 'date-fns'

import TransactionFilter from '@/components/transactions/TransactionFilter'
import Heading from '@/components/ui/Heading'
import { getSalesByDate } from '@/src/api'

export default async function SalesPage() {
  const queryClient = new QueryClient()

  const today = new Date()
  const formattedDate = format(today, 'yyyy-MM-dd')

  /** Solo para cargar los datos */
  await queryClient.prefetchQuery({
    queryKey: ['sales', formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  })

  return (
    <>
      <Heading>Ventas</Heading>
      <p className='text-lg'>
        En esta sección aparecerán las ventas, utiliza el calendario para
        filtrar por fecha
      </p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>
    </>
  )
}
