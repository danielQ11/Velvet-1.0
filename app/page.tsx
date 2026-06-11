import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Sparkles, Leaf, CreditCard, Star, Heart } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { products, categories } from '@/lib/products'

const perks = [
  { icon: Truck, title: 'Envío gratis', text: 'En compras +$150.000' },
  { icon: Sparkles, title: 'Productos originales', text: '100% auténticos' },
  { icon: Leaf, title: 'Cruelty free', text: 'Belleza consciente' },
  { icon: CreditCard, title: 'Paga seguro', text: 'Múltiples medios' },
]

const testimonials = [
  {
    name: 'Valentina R.',
    text: 'Los productos son increíbles, mi piel nunca se había sentido tan bien. ¡100% recomendado!',
    rating: 5,
  },
  {
    name: 'Camila G.',
    text: 'Me encanta la calidad y la presentación. Es mi tienda de confianza para todo lo de belleza.',
    rating: 5,
  },
  {
    name: 'Sofía M.',
    text: 'El envío fue super rápido y todo llegó perfecto. Los tonos son exactos a las fotos.',
    rating: 5,
  },
]

export default function HomePage() {
  const featured = products.filter((p) => p.bestSeller || p.isNew).slice(0, 4)

  return (
    <main>
      <SiteHeader />
      <CartDrawer />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/Videos/peaceful-pink-lotus-lake-relaxing-nature-wallpaperwaves-com.mp4" type="video/mp4" />
          </video>
          {/* Overlay to ensure text readability while maintaining the pink vibe */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>

        {/* Decorative sparkles */}
        <div className="pointer-events-none absolute inset-0 z-10 sparkle-field" aria-hidden="true">
          <span className="absolute left-[12%] top-[15%] text-gold opacity-60" style={{ fontSize: 18, animation: 'sparkle-pulse 3s ease-in-out infinite' }}>✦</span>
          <span className="absolute right-[18%] top-[25%] text-gold opacity-40" style={{ fontSize: 12, animation: 'sparkle-pulse 3s ease-in-out 0.8s infinite' }}>✦</span>
          <span className="absolute left-[45%] top-[8%] text-gold opacity-50" style={{ fontSize: 10, animation: 'sparkle-pulse 3s ease-in-out 1.6s infinite' }}>✦</span>
          <span className="absolute right-[8%] bottom-[30%] text-gold opacity-40" style={{ fontSize: 16, animation: 'sparkle-pulse 3s ease-in-out 2.2s infinite' }}>✦</span>
          <span className="absolute left-[30%] bottom-[15%] text-gold opacity-30" style={{ fontSize: 14, animation: 'sparkle-pulse 3s ease-in-out 0.5s infinite' }}>✦</span>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-28 md:grid-cols-2 md:px-8 md:pb-20 md:pt-32 lg:pb-28 lg:pt-40">
          {/* Text side */}
          <div className="relative z-20 flex flex-col items-start gap-7 animate-fade-up">
            <div className="divider-star w-full max-w-xs">
              <span>VELVET BEAUTY STUDIO</span>
            </div>

            <h1 className="font-heading text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Tu belleza,{' '}
              <span className="relative inline-block mt-2 sm:mt-0">
                <em className="not-italic text-primary">nuestra inspiración</em>
                <svg className="absolute -bottom-2 left-0 w-full opacity-40" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C40 1.5 80 1 100 3.5C120 6 160 7 199 2" stroke="currentColor" strokeWidth="2" className="text-gold" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: '150ms' }}>
              Tu momento, tu ritual, tu esencia. Descubre maquillaje y skincare
              de alta gama pensados para resaltar lo que te hace única.
            </p>

            <div className="flex flex-wrap gap-4" style={{ animationDelay: '300ms' }}>
              <Link
                href="/tienda"
                className="btn-premium inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white"
              >
                Comprar ahora <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tienda?categoria=skincare"
                className="inline-flex h-11 items-center justify-center rounded-full border border-primary/30 px-8 text-sm font-medium uppercase tracking-wider transition-colors hover:border-primary hover:bg-primary/5"
              >
                Ver skincare
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i} 
                    src={`https://i.pravatar.cc/100?img=${40 + i}`} 
                    alt="Cliente satisfecha" 
                    className="h-9 w-9 rounded-full border-2 border-background object-cover bg-accent" 
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-gold">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">+2,500 clientas satisfechas</p>
              </div>
            </div>
          </div>

          {/* Image side */}
          <div className="relative animate-fade-up md:translate-x-6 lg:translate-x-12" style={{ animationDelay: '200ms' }}>
            <div className="artistic-frame relative aspect-[4/5] w-full overflow-hidden rounded-3xl md:aspect-square lg:aspect-[4/5]">
              <Image
                src="/my images/image2.jpeg"
                alt="Modelo con maquillaje Velvet"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03] sepia-[.35] contrast-[1.15] saturate-[.65] brightness-[.95]"
              />
              {/* Vintage film overlay */}
              <div className="absolute inset-0 bg-[#8c6b52]/10 mix-blend-multiply" />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PERKS & PHRASE ═══ */}
      <section className="border-y border-border/60 bg-white/40 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Quote / Phrase */}
            <div className="flex flex-col justify-center text-center lg:col-span-4 lg:text-left border-b border-border/40 pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">✦ Nuestra filosofía</p>
              <p className="font-heading text-2xl md:text-3xl italic leading-relaxed text-foreground/90">
                &ldquo;Porque te lo mereces, todos los días.&rdquo;
              </p>
            </div>
            
            {/* Perks Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8 lg:pl-6">
              {perks.map((perk, i) => (
                <div key={i} className="flex flex-col items-center text-center sm:items-start sm:text-left gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm transition-transform hover:scale-110">
                    <perk.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold uppercase tracking-wider text-foreground">{perk.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{perk.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-12 text-center">
          <p className="divider-star mx-auto mb-4 max-w-xs text-[10px]">
            <span>EXPLORA</span>
          </p>
          <h2 className="section-title font-heading text-4xl md:text-5xl">
            Compra por categoría
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Todo lo que necesitas para tu rutina de belleza, curado especialmente para ti
          </p>
        </div>
        <div className="stagger-children grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/tienda?categoria=${cat.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl animate-fade-up"
            >
              <Image
                src={cat.image || '/placeholder.svg'}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="category-overlay absolute inset-0 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 p-7 text-white">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Categoría</p>
                <h3 className="font-heading text-2xl md:text-3xl">{cat.name}</h3>
                <p className="mt-1 text-sm opacity-80">{cat.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <span>Explorar</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
              {/* Gold corner accent */}
              <div className="absolute right-5 top-5 text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-60">
                <span className="text-lg">✦</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="relative overflow-hidden bg-secondary/30 py-20">
        {/* Subtle decorative background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
            <div className="text-center sm:text-left">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">✦ Selección especial</p>
              <h2 className="font-heading text-4xl md:text-5xl">Los favoritos</h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Los productos que toda la comunidad ama y recomienda
              </p>
            </div>
            <Link
              href="/tienda"
              className="group flex items-center gap-2 rounded-full border border-primary/30 px-6 py-2.5 text-sm font-medium text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Ver todo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="stagger-children grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BRAND BANNER ═══ */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <Image
            src="/my images/image3.jpeg"
            alt="Velvet Beauty Studio"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/40" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-xl">
            <span className="text-gold text-sm">✦</span>
            <h2 className="mt-4 font-heading text-4xl leading-tight text-white md:text-6xl">
              Bienestar que se ve,{' '}
              <em className="not-italic text-accent">se siente</em> y te transforma
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Tu belleza es tu poder. En Velvet creemos que cada mujer merece
              sentirse extraordinaria cada día.
            </p>
            <Link
              href="/tienda"
              className="btn-premium mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white"
            >
              Descubrir más <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-14 text-center">
          <p className="divider-star mx-auto mb-4 max-w-xs text-[10px]">
            <span>COMUNIDAD VELVET</span>
          </p>
          <h2 className="font-heading text-4xl md:text-5xl">
            Lo que dicen nuestras clientas
          </h2>
        </div>
        <div className="stagger-children grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass-card group relative rounded-2xl p-8 transition-all duration-500 hover:shadow-lg animate-fade-up"
            >
              {/* Quote mark */}
              <span className="quote-mark absolute -top-2 left-6">&ldquo;</span>
              <div className="relative z-10">
                <div className="mb-4 flex gap-0.5 text-gold">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="leading-relaxed text-foreground/80">{t.text}</p>
                <div className="mt-6 flex items-center gap-3">
                  <img 
                    src={`https://i.pravatar.cc/100?img=${20 + i}`} 
                    alt={t.name} 
                    className="h-10 w-10 rounded-full border-2 border-background object-cover bg-accent" 
                  />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">Cliente verificada</p>
                  </div>
                </div>
              </div>
              {/* Hover sparkle */}
              <span className="absolute right-6 top-6 text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-60">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ NEWSLETTER CTA ═══ */}
      <section className="relative mx-auto mb-20 max-w-7xl overflow-hidden rounded-3xl px-4 md:px-0">
        <div className="hero-gradient sparkle-field flex flex-col items-center gap-6 px-6 py-16 text-center md:py-20">
          <span className="text-gold text-lg">✦</span>
          <h2 className="font-heading text-3xl md:text-4xl">
            Únete a la comunidad Velvet
          </h2>
          <p className="max-w-md text-muted-foreground">
            Sé la primera en conocer nuestros lanzamientos, promociones
            exclusivas y tips de belleza.
          </p>
          <form className="flex w-full max-w-md gap-3">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 rounded-full border border-border bg-background/80 px-5 py-3 text-sm backdrop-blur placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              className="btn-premium shrink-0 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white"
            >
              Suscribir
            </button>
          </form>
          <p className="text-xs text-muted-foreground">
            Sin spam. Puedes cancelar cuando quieras.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
