import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export function getAdminEmails(): string[] {
  const list = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  return [...new Set(list)]
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false
  return getAdminEmails().includes(email.trim().toLowerCase())
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 12 * 60 * 60 },
  callbacks: {
    async signIn({ user }) {
      // Solo correos autorizados pueden entrar al panel
      if (!isAdminEmail(user.email)) return false
      return true
    },
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email
      token.role = 'admin'
      return token
    },
    async session({ session, token }) {
      if (session.user && token.email) session.user.email = token.email as string
      ;(session as unknown as Record<string, unknown>).role = 'admin'
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
}
