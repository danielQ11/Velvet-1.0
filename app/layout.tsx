import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Playfair_Display, Jost } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { CartProvider } from '@/components/cart-context'
import { FavoritesProvider } from '@/components/favorites-context'
import { AuthSessionProvider } from '@/components/session-provider'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})
const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Velvet | Maquillaje y Cuidado de Piel',
  description:
    'Velvet Colombia — Descubre maquillaje y skincare de alta gama. Envío gratis por compras superiores a $150.000 COP.',
  generator: 'v0.app',
  icons: {
    icon: '/Logo.jpeg',
    apple: '/Logo.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${jost.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <AuthSessionProvider>
            <CartProvider>
              <FavoritesProvider>{children}</FavoritesProvider>
            </CartProvider>
          </AuthSessionProvider>
        </Suspense>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
