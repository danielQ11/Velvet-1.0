import Link from 'next/link'
import Image from 'next/image'
import { Camera, AtSign, MessageCircle } from 'lucide-react'

const columns = [
  {
    title: 'Comunidad Velvet',
    links: ['Quiénes somos', 'Blog de belleza', 'Trabaja con nosotros'],
  },
  {
    title: 'Links de Interés',
    links: ['Políticas de envío', 'Cambios y devoluciones', 'Términos y condiciones', 'Tratamiento de datos'],
  },
]

const socials = [
  { label: 'Instagram', icon: Camera },
  { label: 'Facebook', icon: MessageCircle },
  { label: 'Correo', icon: AtSign },
]

export function SiteFooter() {
  return (
    <footer className="footer-gradient relative mt-0 overflow-hidden">
      {/* Decorative top sparkle */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 text-gold opacity-30" aria-hidden="true">
        <span style={{ fontSize: 18 }}>✦</span>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/Logo.jpeg"
                alt="Velvet Beauty"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Porque te lo mereces, todos los días. Únete a la comunidad Velvet
              y descubre promociones, lanzamientos y más.
            </p>

            {/* Newsletter */}
            <form className="mt-6 flex max-w-sm gap-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                aria-label="Correo electrónico"
                className="flex-1 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm backdrop-blur placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="btn-premium shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white"
              >
                Suscribir
              </button>
            </form>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em]">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social column */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em]">
              Síguenos
            </h3>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground backdrop-blur transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md"
                >
                  <social.icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
                </Link>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-8 space-y-2">
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
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="text-gold text-sm">✦</span>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Velvet Beauty Studio. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <Link
                key={social.label}
                href="#"
                aria-label={social.label}
                className="text-muted-foreground/60 transition-colors hover:text-primary"
              >
                <social.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
