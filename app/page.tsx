import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Sparkles, Leaf, CreditCard } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { products, categories } from '@/lib/products'

const perks = [
  { icon: Truck, title: 'Envio gratis', text: 'En compras +$150.000' },
  { icon: Sparkles, title: 'Productos originales', text: '100% autenticos' },
  { icon: Leaf, title: 'Cruelty free', text: 'Belleza consciente' },
  { icon: CreditCard, title: 'Paga seguro', text: 'Multiples medios' },
]

export default function HomePage() {
  const featured = products.filter((p) => p.bestSeller || p.isNew).slice(0, 4)

  return (
    <main>
      <SiteHeader />
      <CartDrawer />

      {/* Hero */}
      <section className="relative overflow-hidden bg-accent/40">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-8 md:py-16 lg:py-20">
          <div className="flex flex-col items-start gap-6">
            <span className="rounded-full bg-background px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary">
              Nueva coleccion
            </span>
            <h1 className="text-balance font-heading text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
              Tu belleza, en su mejor versión
            </h1>
            <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
              Descubre maquillaje y skincare de alta gama pensados para resaltar
              lo que te hace única. Formulas cuidadas, tonos para cada piel.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/tienda">
                  Comprar ahora <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tienda?categoria=skincare">Ver skincare</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:aspect-square lg:aspect-[4/5]">
            <Image
              src="/hero.png"
              alt="Modelo con maquillaje Blush Bar"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4 md:px-8">
          {perks.map((perk) => (
            <div key={perk.title} className="flex items-center gap-3">
              <perk.icon className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">{perk.title}</p>
                <p className="text-xs text-muted-foreground">{perk.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl">
              Compra por categoría
            </h2>
            <p className="mt-2 text-muted-foreground">
              Todo lo que necesitas para tu rutina de belleza
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/tienda?categoria=${cat.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={cat.image || '/placeholder.svg'}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-background">
                <h3 className="font-heading text-2xl">{cat.name}</h3>
                <p className="text-sm opacity-90">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl">Los favoritos</h2>
            <p className="mt-2 text-muted-foreground">
              Los productos que toda la comunidad ama
            </p>
          </div>
          <Link
            href="/tienda"
            className="hidden items-center gap-1 text-sm text-primary hover:underline sm:flex"
          >
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial banner */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center md:px-8">
          <h2 className="max-w-2xl text-balance font-heading text-3xl md:text-4xl">
            Aprende a maquillarte como una profesional
          </h2>
          <p className="max-w-xl text-pretty leading-relaxed text-primary-foreground/85">
            Únete a nuestras clases de automaquillaje y descubre los secretos de
            nuestras artistas. Cupos limitados cada mes.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/tienda">Reservar mi cupo</Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
