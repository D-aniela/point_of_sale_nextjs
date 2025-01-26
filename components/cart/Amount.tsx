type AmountProps = {
  label: string
  amount: string
}
const Amount = ({ label, amount }: AmountProps) => {
  return (
    <div className='flex justify-between'>
      <dt className='font-bold'>{label}</dt>
      <dd className='text-gray-900'>{amount}</dd>
    </div>
  )
}

export default Amount
