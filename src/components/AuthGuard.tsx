'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from '@/hooks/useSession'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { session, isLoading } = useSession()

  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/login')
    }
  }, [session, isLoading, router])

  if (isLoading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  return <>{children}</>
}
