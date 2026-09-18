'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function LoginInner() {
  const router = useRouter()
  const params = useSearchParams()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const error = params.get('error')

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      router.push('/admin')
      router.refresh()
    }
  }, [status, session, router])

  async function login() {
    setLoading(true)
    try {
      await signIn('google', { callbackUrl: '/admin' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-white/70 p-8 shadow-lg backdrop-blur">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Image src="/Logo.jpeg" alt="Velvet" width={64} height={64} className="rounded-full object-cover" />
          <h1 className="font-heading text-3xl">Admin Velvet</h1>
          <p className="text-sm text-muted-foreground">Acceso solo para la administradora de la tienda.</p>
        </div>
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error === 'AccessDenied'
              ? 'Ese correo de Google no está autorizado. Usa el correo de la administradora.'
              : 'No se pudo iniciar sesión. Intenta de nuevo.'}
          </p>
        )}
        <Button onClick={login} disabled={loading || status === 'loading'} className="w-full">
          {loading ? 'Conectando con Google…' : 'Continuar con Google'}
        </Button>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Solo los correos autorizados en ADMIN_EMAILS pueden entrar.
        </p>
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">← Volver a la tienda</Link>
        </div>
      </div>
    </main>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  )
}
