import Link from 'next/link'
import { Camera, AtSign, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const columns = [
  {
    title: 'Comunidad BB',
    links: ['Quienes somos', 'Clases de automaquillaje', 'Blog de belleza', 'Trabaja con nosotros'],
  },
  {
    title: 'Nuestras Tiendas',
    links: ['Bogota', 'Medellin', 'Cali', 'Barranquilla'],
  },
  {
    title: 'Links de Interes',
    links: ['Politicas de envio', 'Cambios y devoluciones', 'Terminos y condiciones', 'Tratamiento de datos'],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="font-heading text-2xl">
              Vel<span className="text-primary">vet</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Registra tu email para unirte a la comunidad Velvet y enterarte
              de promociones, lanzamientos y mucho mas.
            </p>
            <form className="mt-5 flex max-w-sm gap-2">
              <Input
                type="email"
                placeholder="Tu correo electronico"
                aria-label="Correo electronico"
                className="bg-background"
              />
              <Button type="submit">Suscribir</Button>
            </form>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Velvet. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
              <Camera className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary">
              <MessageCircle className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Correo" className="text-muted-foreground hover:text-primary">
              <AtSign className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
