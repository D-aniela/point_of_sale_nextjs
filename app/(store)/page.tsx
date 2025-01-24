import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/1')
  return <div>Home</div>
}
