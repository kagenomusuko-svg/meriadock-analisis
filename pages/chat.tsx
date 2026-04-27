import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Chat() {
  const router = useRouter()
  useEffect(() => { router.replace('/constructor') }, [])
  return null
}