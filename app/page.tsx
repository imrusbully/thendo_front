import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const heroColumns = [
  {
    title: 'Smart by design',
    body: 'AI learns your taste and context to surface activities you will actually enjoy.',
  },
  {
    title: 'Local + beyond',
    body: 'From hidden neighborhood gems to bucket-list experiences, all in one feed.',
  },
  {
    title: 'Zero decision fatigue',
    body: 'Stop endless scrolling. Get a short, confident shortlist in seconds.',
  },
]

const pillars = [
  {
    no: '01',
    title: 'Discover',
    body: 'Tell us your mood, time, and energy. Thendo reads the signal and finds the match.',
  },
  {
    no: '02',
    title: 'Personalize',
    body: 'Every pick is shaped by your history and feedback — the model sharpens as you go.',
  },
  {
    no: '03',
    title: 'Experience',
    body: 'Save, plan, and go. Rate what you tried and watch the next batch get better.',
  },
  {
    no: '04',
    title: 'Belong',
    body: 'Connect with people who chase the same kind of moments you do.',
  },
]

const values = [
  {
    title: 'Curiosity first',
    body: 'We bias toward discovery — the unexpected coffee bar, the trail nobody posts about.',
  },
  {
    title: 'Respect your time',
    body: 'Fewer, better suggestions. We optimize for the decision, not the scroll.',
  },
  {
    title: 'Built with people',
    body: 'Real feedback from real explorers shapes every recommendation we make.',
  },
  {
    title: 'Always on',
    body: 'Plans change. Thendo adapts in real time, before, during, and after.',
  },
]

const mission = [
  {
    no: '1',
    body: 'We exist to end decision fatigue — turning "what should we do?" into a confident answer.',
  },
  {
    no: '2',
    body: 'We empower people to discover activities, connect with communities, and live more.',
  },
  {
    no: '3',
    body: 'We are building a world where finding your next great experience takes seconds, not hours.',
  },
]

// Growth chart points (normalized into a 720x260 viewBox)
const chartPoints = [
  { x: 60, y: 210, label: '1k', x2: '04' },
  { x: 240, y: 150, label: '2.5k', x2: '12' },
  { x: 430, y: 110, label: '3.3k', x2: '24' },
  { x: 660, y: 40, label: '5.3k', x2: '48' },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero — big stat + headline + three columns */}
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
                  Thendo — activity intelligence
                </p>
                <div className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter text-accent leading-none">
                  80%
                </div>
                <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.05] max-w-xl">
                  of your best moments start with a single good suggestion.
                </h1>
                <p className="mt-6 text-base text-muted-foreground max-w-md leading-relaxed">
                  Thendo uses AI to turn your mood, time, and place into a short list of
                  things worth doing — no scrolling required.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground bg-accent hover:opacity-90 transition-opacity"
                  >
                    Get started free
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground border border-foreground/20 hover:bg-muted transition-colors"
                  >
                    See pricing
                  </Link>
                </div>
              </div>

              {/* Image placeholder block */}
              <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[3/4] overflow-hidden bg-ink">
                <div className="absolute inset-0 bg-mesh opacity-50" aria-hidden="true" />
                <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-accent opacity-40 blur-3xl animate-blob" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider bg-accent text-accent-foreground">
                    Live now
                  </span>
                  <p className="mt-3 text-white/90 text-sm max-w-xs leading-relaxed">
                    50,000+ explorers already turning idle evenings into stories worth telling.
                  </p>
                </div>
              </div>
            </div>

            {/* Three columns */}
            <div className="mt-14 grid sm:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
              {heroColumns.map((c) => (
                <div key={c.title} className="bg-background p-6">
                  <div className="w-8 h-0.5 bg-accent mb-4" />
                  <h3 className="font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dark pillars — bordered cards */}
        <section id="how-it-works" className="bg-ink py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white max-w-md">
                How Thendo works
              </h2>
              <p className="text-sm text-white/60 max-w-sm">
                Four moves, one loop. The more you use it, the sharper every suggestion becomes.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {pillars.map((p) => (
                <div
                  key={p.no}
                  className="group bg-ink p-7 min-h-[15rem] flex flex-col transition-colors hover:bg-accent"
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-accent group-hover:text-accent-foreground transition-colors">
                    {p.no}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">{p.title}</h3>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed group-hover:text-accent-foreground/90 transition-colors">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Big stat challenge */}
        <section className="bg-foreground py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-background leading-[1.1] max-w-md">
                The real challenge isn&apos;t finding things to do. It&apos;s deciding.
              </h2>
              <div className="lg:text-right">
                <div className="text-8xl sm:text-9xl font-bold tracking-tighter text-accent leading-none">
                  78%
                </div>
                <p className="mt-4 text-background/70 text-sm max-w-sm lg:ml-auto leading-relaxed">
                  of people abandon plans simply because choosing felt like too much work.
                  Thendo removes the friction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Growing Community + chart */}
        <section id="community" className="py-20 sm:py-28 border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Our growth story
            </p>
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-none">
                  Growing
                  <br />
                  Community
                </h2>
                <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-sm">
                  Our community is growing every day. Explorers, locals, and
                  the simply curious build the network of recommendations that
                  makes every suggestion smarter.
                </p>
              </div>

              {/* Line chart */}
              <div className="bg-card border border-foreground/10 p-6 sm:p-8">
                <svg viewBox="0 0 720 260" className="w-full h-auto" role="img" aria-label="Community growth chart">
                  {/* gridlines */}
                  {[40, 110, 180, 250].map((y) => (
                    <line key={y} x1="40" y1={y} x2="700" y2={y} stroke="currentColor" className="text-foreground/10" strokeWidth="1" />
                  ))}
                  {/* line */}
                  <polyline
                    points={chartPoints.map((p) => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* points + labels */}
                  {chartPoints.map((p) => (
                    <g key={p.label}>
                      <circle cx={p.x} cy={p.y} r="6" fill="var(--background)" stroke="var(--accent)" strokeWidth="3" />
                      <text x={p.x} y={p.y - 16} textAnchor="middle" className="fill-foreground" fontSize="20" fontWeight="700">
                        {p.label}
                      </text>
                      <text x={p.x} y="252" textAnchor="middle" className="fill-muted-foreground" fontSize="13">
                        {p.x2}m
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section id="features" className="py-20 sm:py-28 border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-16">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-none">
                  Our
                  <br />
                  Values
                </h2>
                <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xs">
                  At Thendo, our values guide everything we do. They shape how we
                  build, who we build for, and the experiences we surface.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
                {values.map((v, i) => (
                  <div key={v.title} className="bg-background p-7">
                    <div className="w-10 h-10 mb-5 flex items-center justify-center bg-accent text-accent-foreground font-bold text-sm">
                      0{i + 1}
                    </div>
                    <h3 className="font-bold text-foreground">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission — dark + numbered + banner heading */}
        <section className="bg-ink py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-accent leading-[0.9]">
                Our
                <br />
                Mission
              </h2>
              <p className="text-white/70 text-lg max-w-sm lg:ml-auto leading-relaxed">
                Turning &ldquo;what should we do?&rdquo; into a confident answer — for everyone,
                everywhere, in seconds.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
              {mission.map((m) => (
                <div key={m.no} className="bg-ink p-7">
                  <div className="text-accent text-2xl font-bold mb-4">{m.no}</div>
                  <p className="text-sm text-white/70 leading-relaxed">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — orange "Thank You" style */}
        <section className="bg-accent py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-10 items-end">
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-accent-foreground leading-[0.9]">
                Start
                <br />
                living.
              </h2>
              <div className="lg:text-right">
                <p className="text-accent-foreground/90 text-lg max-w-sm lg:ml-auto leading-relaxed mb-8">
                  Join thousands of people finding their next great experience every day.
                  It is free to begin.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-accent bg-background hover:opacity-90 transition-opacity"
                >
                  Get started free
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
