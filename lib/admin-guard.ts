import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdminEmail } from '@/lib/auth-options'

export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email || !isAdminEmail(email)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  return null
}

export async function getAdminSession() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email || !isAdminEmail(email)) return null
  return { email }
}
