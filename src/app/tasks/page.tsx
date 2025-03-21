import AuthGuard from '@/components/AuthGuard'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <AuthGuard>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl">Tasks. In construction.</h1>
      </main>
    </AuthGuard>
  )
}
