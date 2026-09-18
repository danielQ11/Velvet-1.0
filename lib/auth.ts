import { getServerSession } from 'next-auth'
import { authOptions, isAdminEmail } from '@/lib/auth-options'

// Sesión de administradora vía Google (next-auth) + lista ADMIN_EMAILS.
export async function getSession(): Promise<{ email: string } | null> {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email || !isAdminEmail(email)) return null
  return { email }
}
