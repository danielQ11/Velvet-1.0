'use client'

import Link from 'next/link'
import { Search, ShoppingBag, Menu, User, Heart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/components/cart-context'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/tienda', label: 'Tienda' },
  { href: '/tienda?categoria=maquillaje', label: 'Maquillaje' },
  { href: '/tienda?categoria=skincare', label: 'Skincare' },
  { href: '/tienda?categoria=herramientas', label: 'Herramientas' },
]

export function SiteHeader() {
  const { totalItems, setOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="bg-primary text-primary-foreground">
        <p className="py-2 text-center text-xs tracking-[0.18em] uppercase">
          Envio gratis por compras superiores a $150.000 COP
        </p>
      </div>
      <div className="border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <button
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center md:flex-1">
            <span className="font-heading text-2xl tracking-tight md:text-3xl">
              Vel<span className="text-primary">vet</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm tracking-wide text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:flex-1 md:justify-end">
            <Button variant="ghost" size="icon" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              aria-label="Cuenta"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              aria-label="Favoritos"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Carrito"
              className="relative"
              onClick={() => setOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="flex flex-col gap-1 border-t border-border bg-background px-4 py-3 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
