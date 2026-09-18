import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { isAdminEmail } from '@/lib/auth-options'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/')
  const isAdminApi = pathname.startsWith('/api/admin/')
  // next-auth usa /api/auth/* para el flujo de Google: siempre libre
  if (pathname.startsWith('/api/auth/')) return NextResponse.next()

  if (!isAdminPage && !isAdminApi) return NextResponse.next()
  if (pathname === '/admin/login') return NextResponse.next()

  const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET
  const token = await getToken({ req, secret }).catch(() => null)
  const email = (token?.email as string | undefined) ?? null
  if (email && isAdminEmail(email)) return NextResponse.next()

  if (isAdminApi) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const url = req.nextUrl.clone()
  url.pathname = '/admin/login'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
