'use client'

import Link from 'next/link'
import { useSession } from '@/hooks/useSession'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function Navbar() {
  const { session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const handleLogout = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push('/login')
    setLoading(false)
  }

  return (
    <nav className="flex w-full items-center justify-between bg-gray-900 p-4 text-white">
      <div className="flex gap-6">
        <Link href="/home" className="hover:underline">
          Home
        </Link>
        <Link href="/cash" className="hover:underline">
          Cash
        </Link>
        <Link href="/tasks" className="hover:underline">
          Tasks
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {session && (
          <span className="text-sm text-gray-300">{session.user.email}</span>
        )}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </nav>
  )
}
