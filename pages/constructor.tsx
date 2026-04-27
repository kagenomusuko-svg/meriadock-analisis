import dynamic from 'next/dynamic'

const Constructor = dynamic(
  () => import('../components/chat/Constructor'),
  { ssr: false }
)

export default function ConstructorPage() {
  return <Constructor />
}