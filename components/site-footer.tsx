import Link from 'next/link'
import Image from 'next/image'

export function SiteFooter() {
  return (
    <footer className="footer-gradient relative mt-0 overflow-hidden">
      {/* Decorative top sparkle */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 text-gold opacity-30" aria-hidden="true">
        <span style={{ fontSize: 18 }}>✦</span>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 md:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <Link href="/" className="inline-block">
            <Image
              src="/Logo.jpeg"
              alt="Velvet Beauty"
              width={72}
              height={72}
              className="rounded-full object-cover"
            />
          </Link>

          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Porque te lo mereces, todos los días. Maquillaje y skincare 100% original.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              ✦ 100% Original
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              ✦ Cruelty Free
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              ✦ Envío seguro
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="text-gold text-sm">✦</span>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Velvet Beauty Studio. Todos los derechos reservados.
            </p>
          </div>
          <Link href="/tienda" className="text-xs text-muted-foreground transition-colors hover:text-primary">
            Explorar la tienda
          </Link>
        </div>
      </div>
    </footer>
  )
}
