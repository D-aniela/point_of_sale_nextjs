type AmountProps = {
  label: string
  amount: string
  discount?: boolean
}

const Amount = ({ label, amount, discount }: AmountProps) => {
  return (
    <div
      className={`${
        discount && 'bg-green-400 text-green-900 p-1'
      } flex justify-between`}
    >
      <dt className='font-bold'>{label}</dt>
      <dd className='text-gray-900'>
        {discount && '-'}
        {amount}
      </dd>
    </div>
  )
}

export default Amount
