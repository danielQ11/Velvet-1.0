'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingBag, Menu, User, Heart, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart-context'
import { useFavorites } from '@/components/favorites-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/favoritos', label: 'Favoritos' },
]

export function SiteHeader() {
  const { totalItems, setOpen } = useCart()
  const { count: favCount } = useFavorites()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/tienda?buscar=${encodeURIComponent(q)}` : '/tienda')
    setSearchOpen(false)
  }

  return (
    <header className="fixed top-0 z-40 w-full transition-colors duration-300">
      {/* Main nav */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'border-border/60 bg-background/95 shadow-sm backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center md:flex-1">
            <Image
              src="/Logo.jpeg"
              alt="Velvet Beauty"
              width={52}
              height={52}
              className="rounded-full object-cover"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link-elegant text-[13px] font-medium uppercase tracking-[0.1em] text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5 md:flex-1 md:justify-end">
            {searchOpen ? (
              <form onSubmit={submitSearch} className="flex items-center gap-1">
                <Input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar productos…"
                  aria-label="Buscar productos"
                  className="h-9 w-40 rounded-full md:w-52"
                />
                <Button variant="ghost" size="icon" aria-label="Cerrar búsqueda" className="rounded-full" onClick={() => setSearchOpen(false)} type="button">
                  <X className="h-[18px] w-[18px]" />
                </Button>
              </form>
            ) : (
              <Button variant="ghost" size="icon" aria-label="Buscar" className="rounded-full hover:bg-accent/50" onClick={() => setSearchOpen(true)}>
                <Search className="h-[18px] w-[18px]" />
              </Button>
            )}
            <Link
              href="/admin"
              aria-label="Administración"
              title="Administración"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all outline-none select-none hover:bg-muted hover:text-foreground"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Link
              href="/favoritos"
              aria-label="Favoritos"
              title="Favoritos"
              className="relative inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all outline-none select-none hover:bg-muted hover:text-foreground"
            >
              <Heart className="h-[18px] w-[18px]" />
              {favCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground shadow-sm">
                  {favCount}
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Carrito"
              className="relative rounded-full hover:bg-accent/50"
              onClick={() => setOpen(true)}
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground shadow-sm">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="animate-fade-in border-t border-border/40 bg-background px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium tracking-wide text-foreground/70 transition-all hover:bg-accent/50 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-border/40 pt-4">
              <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                ✦ Velvet Beauty Studio
              </p>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
