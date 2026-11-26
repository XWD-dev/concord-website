import { useState, type ReactNode } from 'react'
import {
  ArrowRight, ArrowUpRight, Search, ShoppingBag, Heart, Menu, X, Plus,
  Instagram, Facebook, Send, Check, Leaf, Truck, RefreshCcw,
  Globe2, MapPin, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const photo = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

type Category = 'Apparel' | 'Bags'
type Product = {
  id: number
  name: string
  category: Category
  tag: string
  price: number
  image: string
  description: string
}

const products: Product[] = [
  { id: 1, name: 'LÉA LINEN SHIRT', category: 'Apparel', tag: 'New in', price: 129, image: photo('photo-1490481651871-ab68de25d43d'), description: 'A relaxed linen shirt with mother-of-pearl buttons and a gently dropped shoulder. Made in Portugal.' },
  { id: 2, name: 'CAMILLE DRESS', category: 'Apparel', tag: 'Bestseller', price: 189, image: photo('photo-1487222477894-8943e31ef7b2'), description: 'A fluid midi dress that moves with you. Cut from responsibly sourced viscose with a hand-finished hem.' },
  { id: 3, name: 'MARGAUX COAT', category: 'Apparel', tag: 'New in', price: 349, image: photo('photo-1539109136881-3be0616acf4b'), description: 'The coat you will keep for a decade. Wool blend, oversized lapels, fully lined in cupro.' },
  { id: 4, name: 'AMÉLIE KNIT', category: 'Apparel', tag: 'Editor’s pick', price: 159, image: photo('photo-1469334031218-e382a71b716b'), description: 'A fine-gauge merino knit with a soft drape. Warm without weight, elegant without effort.' },
  { id: 5, name: 'SAC PARIS', category: 'Bags', tag: 'Bestseller', price: 289, image: photo('photo-1594223274512-ad4803739b7c'), description: 'Structured top-grain leather, hand-finished edges and just enough room for the everyday.' },
  { id: 6, name: 'TOTE Nº5', category: 'Bags', tag: 'New in', price: 219, image: photo('photo-1584917865442-de89df76afd3'), description: 'An oversized tote in supple leather with an interior pocket for the things that matter.' },
  { id: 7, name: 'MINI CROSSBODY', category: 'Bags', tag: 'Editor’s pick', price: 179, image: photo('photo-1590874103328-eac38a683ce7'), description: 'A petite companion in vegetable-tanned leather. Adjustable strap, antique brass hardware.' },
  { id: 8, name: 'WEEKENDER', category: 'Bags', tag: 'Limited', price: 329, image: photo('photo-1622560480654-d96214fdc887'), description: 'Soft-grained leather and a roomy interior. Built for last-minute escapes and long weekends.' },
]

const navItems = ['New In', 'Women', 'Bags', 'Lookbook', 'About']

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-taupe">
      <span>{index}</span>
      <span className="h-px w-9 bg-taupe/50" />
      <span className="text-foreground/45">{children}</span>
    </div>
  )
}

const darkButton = 'h-12 rounded-none bg-[#3d3229] px-8 text-[10px] uppercase tracking-[0.22em] text-[#faf8f4] transition hover:bg-taupe'
const lightButton = 'h-12 rounded-none border border-foreground/25 bg-transparent px-8 text-[10px] uppercase tracking-[0.22em] text-foreground transition hover:border-taupe hover:text-taupe'

function App() {
  const [cart, setCart] = useState<Product[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [sent, setSent] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState('')

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product])
    setQuickView(null)
    setToast(`${product.name} added to your bag`)
    window.setTimeout(() => setToast(''), 2600)
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const companyName = 'HONG KONG CONCORD LIMITED'
  const companyEmail = 'info@concord.shopping'
  const contactPerson = 'WANG JUAN'
  const phone = '52020474'
  const address = 'Room 17, 15/F, Vanta Industrial Centre, 21-33 Tai Lin Pai Road, Kwai Chung, New Territories, Hong Kong'

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      {/* Announcement */}
      <div className="bg-[#3d3229] py-2.5 text-center text-[9px] uppercase tracking-[0.3em] text-[#f4eee5]/80 sm:text-[10px]">
        New season 2026 — the art of slow dressing <span className="mx-3 text-[#c9a98b]">✦</span> Free worldwide shipping over $150
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 lg:px-14">
          <button className="text-foreground/70 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={21} strokeWidth={1.3} />
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.slice(0, 3).map((item) => (
              <a key={item} href="#new-in" className="text-[10px] uppercase tracking-[0.2em] text-foreground/60 transition hover:text-taupe">{item}</a>
            ))}
          </nav>

          <a href="#top" className="font-display text-[26px] tracking-[0.3em] text-foreground sm:text-[30px]">SOLÈNE</a>

          <div className="flex items-center gap-5 text-foreground/70">
            <button aria-label="Search" className="hidden transition hover:text-taupe sm:block"><Search size={18} strokeWidth={1.3} /></button>
            <button aria-label="Favorites" className="hidden transition hover:text-taupe sm:block"><Heart size={18} strokeWidth={1.3} /></button>
            <button aria-label="Cart" className="relative transition hover:text-taupe" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={18} strokeWidth={1.3} />
              {cart.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-taupe text-[9px] text-white">{cart.length}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="flex h-20 items-center justify-between border-b border-foreground/10 px-6">
            <span className="font-display text-2xl tracking-[0.3em]">SOLÈNE</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={22} strokeWidth={1.3} /></button>
          </div>
          <div className="flex flex-col px-6 pt-8">
            {navItems.map((item, i) => (
              <a key={item} href="#new-in" onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-foreground/10 py-6 font-display text-3xl">
                {item}<span className="text-[10px] tracking-widest text-taupe">0{i + 1}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Hero */}
      <section id="top" className="relative h-[76vh] min-h-[560px] max-h-[860px] overflow-hidden bg-sand">
        <img src={photo('photo-1509631179647-0177331693ae', 2000)} alt="SOLÈNE spring summer collection" className="absolute inset-0 h-full w-full object-cover object-center animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/55 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-center px-5 lg:px-14">
          <div className="animate-fade-up">
            <p className="text-[10px] uppercase tracking-[0.4em] text-taupe">Spring / Summer 2026</p>
            <h1 className="mt-7 max-w-3xl font-display text-[clamp(3.4rem,7.6vw,7.4rem)] leading-[0.96] tracking-tight">
              Clothes for<br /><em className="text-taupe">the life you live.</em>
            </h1>
            <p className="mt-8 max-w-sm text-[13px] leading-7 text-foreground/65">
              Considered apparel and leather goods. Made slowly, worn often, loved for years.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-7">
              <Button asChild className={darkButton}>
                <a href="#new-in">Shop new arrivals <ArrowRight className="ml-2" size={14} /></a>
              </Button>
              <a href="#lookbook" className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-[10px] uppercase tracking-[0.22em] transition hover:border-taupe hover:text-taupe">
                Explore the lookbook <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-8 hidden h-28 w-28 items-center justify-center rounded-full border border-foreground/25 bg-background/70 text-center backdrop-blur sm:flex animate-drift">
          <div>
            <p className="font-display text-2xl leading-none">SS / 26</p>
            <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-taupe">Collection</p>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <div className="border-y border-foreground/10 bg-cream">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-5 text-[9px] uppercase tracking-[0.25em] text-foreground/55 lg:justify-between lg:px-14">
          {['Designed in Paris', 'Made in small batches', 'Natural & recycled fibres', 'Loved in 38 countries'].map((item) => (
            <span key={item} className="flex items-center gap-2.5"><span className="h-1 w-1 rounded-full bg-taupe" />{item}</span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="mx-auto max-w-[1500px] px-5 py-24 lg:px-14 lg:py-32">
        <SectionLabel index="01">The wardrobe</SectionLabel>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl leading-tight lg:text-7xl">Two ways to wear it.</h2>
          <p className="max-w-xs text-xs leading-6 text-foreground/50">The pieces you reach for, and the bags you take with you.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { name: 'Apparel', title: 'For every day, and the days that matter.', image: photo('photo-1469334031218-e382a71b716b', 1200) },
            { name: 'Bags', title: 'Carried close, made to last.', image: photo('photo-1566150905458-1bf1fc113f0d', 1200) },
          ].map((cat) => (
            <a key={cat.name} href="#new-in" className="group relative block h-[400px] overflow-hidden bg-sand lg:h-[540px]">
              <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition [transition-duration:1200ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2622]/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 lg:p-10">
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#f0dfcb]">{cat.name}</p>
                <h3 className="mt-3 max-w-sm font-display text-3xl leading-tight text-white lg:text-4xl">{cat.title}</h3>
                <span className="mt-6 inline-flex items-center gap-2 border-b border-white/60 pb-1 text-[10px] uppercase tracking-[0.22em] text-white transition group-hover:border-white">
                  Discover <ArrowUpRight size={13} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section id="new-in" className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-14">
          <SectionLabel index="02">Just landed</SectionLabel>
          <h2 className="mb-10 font-display text-5xl leading-tight lg:text-7xl">New arrivals.</h2>
          <Tabs defaultValue="all">
            <TabsList className="mb-11 h-auto w-full justify-start gap-8 rounded-none border-b border-foreground/15 bg-transparent p-0 sm:gap-12">
              {[['all', 'Everything'], ['apparel', 'Apparel'], ['bags', 'Bags']].map(([value, label]) => (
                <TabsTrigger key={value} value={value} className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-4 text-[10px] uppercase tracking-[0.22em] text-foreground/45 shadow-none transition hover:text-foreground data-[state=active]:border-taupe data-[state=active]:bg-transparent data-[state=active]:text-taupe data-[state=active]:shadow-none">
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {[
              ['all', products],
              ['apparel', products.filter((p) => p.category === 'Apparel')],
              ['bags', products.filter((p) => p.category === 'Bags')],
            ].map(([value, list]) => (
              <TabsContent key={value as string} value={value as string} className="mt-0">
                <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
                  {(list as Product[]).map((product) => (
                    <article key={product.id} className="group">
                      <div className="relative aspect-[3/4] cursor-pointer overflow-hidden bg-sand" onClick={() => setQuickView(product)}>
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        <span className="absolute left-3 top-3 bg-background/85 px-2.5 py-1.5 text-[8px] uppercase tracking-[0.18em] text-foreground/70 backdrop-blur">{product.tag}</span>
                        <button aria-label="Add to favorites" onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id) }} className="absolute right-3 top-3 bg-background/85 p-2 backdrop-blur transition hover:bg-white">
                          <Heart size={14} strokeWidth={1.4} className={favorites.includes(product.id) ? 'fill-taupe text-taupe' : 'text-foreground/60'} />
                        </button>
                        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <Button onClick={(e) => { e.stopPropagation(); addToCart(product) }} className="h-10 w-full rounded-none bg-[#3d3229] text-[9px] uppercase tracking-[0.2em] text-[#faf8f4] hover:bg-taupe">
                            Add to bag · ${product.price}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-start justify-between gap-3 pt-5">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.22em] text-taupe">{product.category}</p>
                          <h3 className="mt-2 font-display text-lg leading-snug lg:text-xl">{product.name}</h3>
                        </div>
                        <span className="pt-5 text-xs text-foreground/50">${product.price}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Lookbook */}
      <section id="lookbook" className="mx-auto max-w-[1500px] px-5 py-24 lg:px-14 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 h-[340px] overflow-hidden bg-sand sm:h-[520px]">
              <img src={photo('photo-1539109136881-3be0616acf4b', 1000)} alt="Lookbook editorial one" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <div className="h-[160px] overflow-hidden bg-sand sm:h-[252px]">
                <img src={photo('photo-1489987707025-afc232f7ea0f', 800)} alt="Lookbook editorial two" className="h-full w-full object-cover" />
              </div>
              <div className="h-[160px] overflow-hidden bg-sand sm:h-[252px]">
                <img src={photo('photo-1594223274512-ad4803739b7c', 800)} alt="Lookbook editorial three" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
          <div>
            <SectionLabel index="03">The lookbook</SectionLabel>
            <h2 className="font-display text-5xl leading-[1.05] lg:text-6xl">A season in<br /><em className="text-taupe">soft focus.</em></h2>
            <p className="mt-8 max-w-md text-[13px] leading-7 text-foreground/60">
              Light linen, the first cool evenings, and a bag that goes everywhere. This season is about
              the quiet confidence of pieces that feel like you — only more so.
            </p>
            <div className="mt-10 grid max-w-md grid-cols-2 gap-6 border-y border-foreground/15 py-7">
              <div><p className="font-display text-4xl text-taupe">38</p><p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-foreground/45">Countries</p></div>
              <div><p className="font-display text-4xl text-taupe">12k+</p><p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-foreground/45">Women dressed</p></div>
            </div>
            <Button asChild variant="outline" className={`${lightButton} mt-10`}>
              <a href="#new-in">View the full story <ArrowRight className="ml-2" size={14} /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-foreground/10 bg-sand/60">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-px bg-foreground/10 px-0 lg:grid-cols-4">
          {[
            { Icon: Leaf, title: 'Considered materials', sub: 'Natural & recycled' },
            { Icon: Sparkles, title: 'Small batches', sub: 'Made with care' },
            { Icon: Truck, title: 'Worldwide delivery', sub: '38 countries' },
            { Icon: RefreshCcw, title: 'Easy returns', sub: '30 days to decide' },
          ].map(({ Icon, title, sub }) => (
            <div key={title} className="flex flex-col items-center bg-[#f1e9dd] px-4 py-12 text-center">
              <Icon size={21} strokeWidth={1.2} className="text-taupe" />
              <p className="mt-5 font-display text-lg">{title}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-foreground/45">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wholesale inquiry */}
      <section id="contact" className="mx-auto max-w-[1500px] px-5 py-24 lg:px-14 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionLabel index="04">For our partners</SectionLabel>
            <h2 className="font-display text-5xl leading-[1.05] lg:text-6xl">For the discerning<br /><em className="text-taupe">buyer.</em></h2>
            <p className="mt-8 max-w-md text-[13px] leading-7 text-foreground/60">
              We work with independent boutiques and concept stores across 38 countries. Tell us about
              your store and we will send our current collection, wholesale terms and samples.
            </p>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-y border-foreground/15 py-8">
              {[['50', 'piece MOQ'], ['38', 'countries'], ['2026', 'collection']].map(([value, label]) => (
                <div key={label}><p className="font-display text-3xl text-taupe">{value}</p><p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-foreground/45">{label}</p></div>
              ))}
            </div>
            <div className="mt-10 space-y-4 text-xs text-foreground/60">
              <p className="flex items-start gap-3"><MapPin size={15} className="mt-0.5 shrink-0 text-taupe" strokeWidth={1.4} /> {address}</p>
              <p className="flex items-center gap-3"><Globe2 size={15} className="text-taupe" strokeWidth={1.4} /> <a href={`mailto:${companyEmail}`} className="transition hover:text-taupe">{companyEmail}</a></p>
            </div>
          </div>

          <div className="border border-foreground/15 bg-background p-8 lg:p-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-taupe">Wholesale inquiry</p>
            <h3 className="mt-4 font-display text-3xl">Let’s work together.</h3>
            {sent ? (
              <div className="mt-10 flex flex-col items-center py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-taupe/15 text-taupe"><Check size={24} strokeWidth={1.4} /></div>
                <p className="mt-6 font-display text-2xl">Thank you for reaching out.</p>
                <p className="mt-3 max-w-xs text-xs leading-6 text-foreground/55">Our wholesale team will get back to you within two business days with the full collection.</p>
                <button onClick={() => setSent(false)} className="mt-7 border-b border-taupe pb-1 text-[10px] uppercase tracking-[0.2em] text-taupe">Send another inquiry</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><label className="text-[9px] uppercase tracking-[0.2em] text-foreground/50">Full name *</label><Input required placeholder="Your name" className="mt-2 h-11 rounded-none border-foreground/20 bg-transparent text-sm focus-visible:ring-taupe" /></div>
                  <div><label className="text-[9px] uppercase tracking-[0.2em] text-foreground/50">Email *</label><Input required type="email" placeholder="you@store.com" className="mt-2 h-11 rounded-none border-foreground/20 bg-transparent text-sm focus-visible:ring-taupe" /></div>
                </div>
                <div><label className="text-[9px] uppercase tracking-[0.2em] text-foreground/50">Store / Company</label><Input placeholder="Store name" className="mt-2 h-11 rounded-none border-foreground/20 bg-transparent text-sm focus-visible:ring-taupe" /></div>
                <div><label className="text-[9px] uppercase tracking-[0.2em] text-foreground/50">What are you looking for? *</label><Textarea required rows={4} placeholder="Tell us about your store, market and interests..." className="mt-2 resize-none rounded-none border-foreground/20 bg-transparent text-sm focus-visible:ring-taupe" /></div>
                <Button type="submit" className={`${darkButton} w-full`}>Send inquiry <Send className="ml-2" size={13} /></Button>
                <p className="text-[10px] text-foreground/40">We usually reply within 2 business days. No spam, ever.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="border-y border-foreground/10 bg-cream py-20">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-14">
          <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-[10px] uppercase tracking-[0.3em] text-taupe">Follow along</p><h2 className="mt-3 font-display text-4xl lg:text-5xl">@solene.official</h2></div>
            <a href="#top" className="inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-[10px] uppercase tracking-[0.2em] transition hover:border-taupe hover:text-taupe">Follow us <ArrowUpRight size={13} /></a>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {['photo-1594223274512-ad4803739b7c', 'photo-1581605405669-fcdf81165afa', 'photo-1490481651871-ab68de25d43d', 'photo-1622560480654-d96214fdc887', 'photo-1487222477894-8943e31ef7b2', 'photo-1590874103328-eac38a683ce7'].map((id) => (
              <a key={id} href="#top" className="group relative aspect-square overflow-hidden bg-sand">
                <img src={photo(id, 500)} alt="SOLÈNE on Instagram" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/25 opacity-0 transition group-hover:opacity-100"><Instagram size={20} className="text-white" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-[1500px] px-5 py-24 text-center lg:px-14 lg:py-32">
        <p className="text-[10px] uppercase tracking-[0.35em] text-taupe">A note from us</p>
        <h2 className="mt-6 font-display text-5xl leading-tight lg:text-7xl">Good things,<br /><em className="text-taupe">quietly delivered.</em></h2>
        <p className="mx-auto mt-6 max-w-md text-xs leading-6 text-foreground/55">New arrivals, lookbook stories and the occasional note from Paris. Once a month, never more.</p>
        <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true) }} className="mx-auto mt-9 flex max-w-md items-center border-b border-foreground/30 focus-within:border-taupe">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Your email address" className="h-14 rounded-none border-0 bg-transparent text-sm placeholder:text-foreground/40 focus-visible:ring-0" />
          <Button type="submit" className="shrink-0 rounded-none bg-transparent px-2 text-[10px] uppercase tracking-[0.22em] text-taupe hover:bg-transparent hover:text-foreground">Join <ArrowRight className="ml-2" size={14} /></Button>
        </form>
        {subscribed && <p className="mt-5 text-xs text-taupe">You’re on the list. Welcome to SOLÈNE.</p>}
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/10 bg-[#3d3229] text-[#f4eee5]">
        <div className="mx-auto max-w-[1500px] px-5 py-16 lg:px-14 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#d3b495]">Get in Touch</p>
              <div className="mt-6 space-y-3 text-[11px] leading-5 text-[#f4eee5]/55">
                <p><span className="font-semibold text-[#f4eee5]/80">Company:</span> {companyName}</p>
                <p><span className="font-semibold text-[#f4eee5]/80">Contact:</span> {contactPerson}</p>
                <p><span className="font-semibold text-[#f4eee5]/80">Email:</span> <a href={`mailto:${companyEmail}`} className="transition hover:text-white">{companyEmail}</a></p>
                <p><span className="font-semibold text-[#f4eee5]/80">Phone:</span> {phone}</p>
                <p><span className="font-semibold text-[#f4eee5]/80">Address:</span> {address}</p>
              </div>
            </div>
            <div>
              <p className="font-display text-3xl tracking-[0.3em]">SOLÈNE</p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[#d3b495]">A {companyName} company</p>
              <p className="mt-5 max-w-xs text-xs leading-6 text-[#f4eee5]/55">Considered apparel and leather goods. Designed in Paris, made to be worn for years.</p>
              <div className="mt-7 flex gap-4 text-[#f4eee5]/60">
                <a href="#top" aria-label="Instagram" className="hover:text-white"><Instagram size={17} strokeWidth={1.3} /></a>
                <a href="#top" aria-label="Facebook" className="hover:text-white"><Facebook size={17} strokeWidth={1.3} /></a>
              </div>
            </div>
            {[
              { title: 'Shop', links: ['New in', 'Apparel', 'Bags', 'Lookbook', 'Gift cards'] },
              { title: 'Company', links: ['Our story', 'Materials', 'Journal', 'Stores', 'Careers'] },
              { title: 'Help', links: ['Shipping & returns', 'Size guide', 'Care guide', 'Contact us', 'Wholesale'] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#d3b495]">{col.title}</p>
                <ul className="mt-6 space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href={link === 'Contact us' || link === 'Wholesale' ? `mailto:${companyEmail}` : '#top'} className="text-xs text-[#f4eee5]/55 transition hover:text-white">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-8 text-[10px] uppercase tracking-[0.15em] text-[#f4eee5]/40">
            <span>© 2026 {companyName}. All rights reserved.</span>
            <a href={`mailto:${companyEmail}`} className="text-[#f4eee5]/60 transition hover:text-white">{companyEmail}</a>
            <span className="flex items-center gap-4"><Globe2 size={13} /> English / USD <span className="hidden sm:inline">·</span> <span className="hidden sm:inline">Privacy · Terms</span></span>
          </div>
        </div>
      </footer>

      {/* Quick view */}
      <Dialog open={!!quickView} onOpenChange={(open) => !open && setQuickView(null)}>
        <DialogContent className="max-w-3xl border-foreground/10 bg-background p-0 text-foreground sm:rounded-none">
          <DialogTitle className="sr-only">Product details</DialogTitle>
          {quickView && (
            <div className="grid md:grid-cols-2">
              <div className="h-64 bg-sand md:h-full">
                <img src={quickView.image} alt={quickView.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <p className="text-[9px] uppercase tracking-[0.3em] text-taupe">{quickView.category} · {quickView.tag}</p>
                <h3 className="mt-4 font-display text-4xl">{quickView.name}</h3>
                <p className="mt-5 text-xs leading-7 text-foreground/60">{quickView.description}</p>
                <p className="mt-7 font-display text-3xl text-taupe">${quickView.price}</p>
                <Button onClick={() => addToCart(quickView)} className={`${darkButton} mt-7 w-full`}>Add to bag <Plus className="ml-2" size={14} /></Button>
                <p className="mt-5 text-[10px] text-foreground/40">Free worldwide shipping over $150 · 30-day returns</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cart */}
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="max-w-md border-foreground/10 bg-background text-foreground sm:rounded-none">
          <DialogTitle className="font-display text-3xl">Your bag</DialogTitle>
          {cart.length === 0 ? (
            <p className="py-10 text-center text-xs text-foreground/45">Nothing in here yet. Something lovely is waiting.</p>
          ) : (
            <>
              <div className="mt-6 max-h-72 space-y-4 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex items-center gap-4 border-b border-foreground/10 pb-4">
                    <img src={item.image} alt={item.name} className="h-16 w-14 object-cover" />
                    <div className="flex-1"><p className="font-display text-base">{item.name}</p><p className="text-[9px] uppercase tracking-[0.2em] text-taupe">{item.category}</p></div>
                    <span className="text-sm">${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-6">
                <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">Total</span>
                <span className="font-display text-3xl text-taupe">${total}</span>
              </div>
              <Button className={`${darkButton} mt-6 w-full`}>Proceed to checkout</Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 border border-taupe/40 bg-background px-5 py-4 text-xs text-foreground shadow-2xl">
          <Check size={15} className="text-taupe" /> {toast}
        </div>
      )}
    </div>
  )
}

export default App
