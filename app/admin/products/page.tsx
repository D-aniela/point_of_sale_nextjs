import Heading from '@/components/ui/Heading'
import { ProductsResponseSchema } from '@/src/schemas'

async function getProducts() {
  const url = `${process.env.API_URL}/products`
  const req = await fetch(url)
  const json = await req.json()
  const products = ProductsResponseSchema.parse(json)
  return products
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <>
      <Heading>Administrar productos</Heading>
    </>
  )
}
