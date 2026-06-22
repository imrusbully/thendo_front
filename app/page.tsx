import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const advantages = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Smart Suggestions',
    description: 'Our AI learns your taste to craft picks you will actually enjoy — no generic lists.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: 'All-in-One Planning',
    description: 'Discover, save, and organize everything in one place — fast, simple, hassle-free.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
      </svg>
    ),
    title: '24/7 Support',
    description: 'Real-time help whenever you need it — before, during, or after your adventure.',
  },
]

const stats = [
  { value: '50K+', label: 'Active explorers' },
  { value: '100K+', label: 'Activities suggested' },
  { value: '4.9', label: 'App rating' },
]

const topPicks = [
  {
    title: 'Sunset Kayak Tour',
    category: 'Outdoor',
    location: 'Coastal Bay',
    rating: '4.8',
    reviews: '1.2k',
    badge: 'Popular',
    gradient: 'from-accent-from to-accent-to',
  },
  {
    title: 'Old Town Food Walk',
    category: 'Food & Drink',
    location: 'City Center',
    rating: '4.6',
    reviews: '950',
    badge: 'Trending',
    gradient: 'from-accent-to to-accent-from',
  },
  {
    title: 'Rooftop Jazz Night',
    category: 'Nightlife',
    location: 'Downtown',
    rating: '4.9',
    reviews: '2k',
    badge: 'New',
    gradient: 'from-chart-3 to-accent-to',
  },
  {
    title: 'Mountain Sunrise Hike',
    category: 'Adventure',
    location: 'Highland Trail',
    rating: '4.7',
    reviews: '780',
    badge: 'Top rated',
    gradient: 'from-accent-from to-chart-2',
  },
]

const collections = [
  {
    title: 'Weekend Reset',
    description: 'Slow mornings, spa time, and easy local strolls to recharge your week.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    gradient: 'from-accent-from to-accent-to',
  },
  {
    title: 'Night Owl Edition',
    description: 'Live music, late-night eats, and rooftop views for after-dark explorers.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    gradient: 'from-chart-3 to-accent-to',
  },
]

const steps = [
  {
    step: '01',
    title: 'Tell us about you',
    description: 'Quick onboarding to understand your interests, energy levels, and what makes you tick.',
  },
  {
    step: '02',
    title: 'Get recommendations',
    description: 'Our AI analyzes your profile and context to suggest the perfect activities.',
  },
  {
    step: '03',
    title: 'Experience and rate',
    description: 'Try new things and give feedback. The more you use it, the smarter it gets.',
  },
]

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-chart-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.343 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.957z" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-24 pb-12 sm:pt-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-foreground min-h-[26rem] sm:min-h-[32rem] flex items-end shadow-glow">
              <div className="absolute inset-0 bg-mesh opacity-90" aria-hidden="true" />
              <div className="absolute -top-24 -left-24 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-accent-from to-accent-to opacity-40 blur-3xl animate-blob" aria-hidden="true" />
              <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-accent-to to-accent-from opacity-30 blur-3xl animate-blob" style={{ animationDelay: '6s' }} aria-hidden="true" />

              <div className="relative z-10 w-full p-8 sm:p-12 lg:p-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium rounded-full bg-white/10 backdrop-blur border border-white/20 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  AI-powered activity suggestions
                </div>

                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.92]">
                  Stop scrolling.
                  <span className="block text-accent">Start living.</span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
                  Thendo uses AI to suggest activities you will love across your city and beyond —
                  curated picks, local gems, and effortless planning, all in one platform.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-accent rounded-full hover:opacity-90 transition-opacity shadow-soft"
                  >
                    Get started free
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white border border-white/30 rounded-full hover:bg-white/10 transition-colors backdrop-blur"
                  >
                    Explore activities
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section id="features" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground leading-snug">
                  Why thousands of explorers choose{' '}
                  <span className="text-gradient-accent">Thendo</span> for their adventures
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
                  From hidden local spots to bucket-list experiences, we make discovering things to do
                  easier, smarter, and more exciting with AI-crafted picks and round-the-clock support.
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl sm:text-3xl font-semibold text-foreground">{stat.value}</div>
                      <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {advantages.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 p-5 rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-glow"
                  >
                    <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-from to-accent-to text-white shadow-glow">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Top picks */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-card border border-border p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  Top picks
                </h2>
                <p className="text-sm text-muted-foreground max-w-sm">
                  From easy evenings to full-day adventures, discover where your next experience will take you.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {topPicks.map((pick) => (
                  <div
                    key={pick.title}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-soft transition-transform hover:-translate-y-1"
                  >
                    <div className={`relative h-40 bg-gradient-to-br ${pick.gradient}`}>
                      <div className="absolute inset-0 bg-mesh opacity-40" aria-hidden="true" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-full bg-background/85 backdrop-blur text-foreground">
                        {pick.badge}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="text-xs font-medium text-gradient-accent">{pick.category}</div>
                      <h3 className="mt-1 font-medium text-foreground">{pick.title}</h3>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {pick.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <StarIcon />
                          {pick.rating} ({pick.reviews})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:opacity-90 transition-opacity"
                >
                  View more
                </Link>
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground" aria-hidden="true">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </span>
                  <span className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground" aria-hidden="true">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collections */}
        <section className="py-8 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-5">
              <div className="flex flex-col justify-between rounded-3xl bg-muted border border-border p-8">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">Collections</h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Curated, customizable, and unforgettable — handpicked activity sets for every kind of explorer.
                  </p>
                </div>
                <Link
                  href="/login"
                  className="mt-8 inline-flex w-fit items-center gap-2 px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:opacity-90 transition-opacity"
                >
                  Browse all collections
                </Link>
              </div>

              {collections.map((c) => (
                <div
                  key={c.title}
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${c.gradient} p-8 min-h-[16rem] flex flex-col justify-end`}
                >
                  <div className="absolute inset-0 bg-mesh opacity-40" aria-hidden="true" />
                  <div className="absolute -top-16 -right-12 w-56 h-56 rounded-full bg-white/15 blur-3xl animate-blob" aria-hidden="true" />
                  <div className="relative z-10">
                    <div className="w-11 h-11 mb-4 flex items-center justify-center rounded-full bg-background/85 backdrop-blur text-foreground">
                      {c.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{c.title}</h3>
                    <p className="mt-2 text-sm text-white/85 leading-relaxed">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Discovery made as easy as 1-2-3
              </h2>
              <p className="mt-4 text-muted-foreground">
                Get personalized recommendations in three simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {steps.map((step, index) => (
                <div key={step.step} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full border-t border-dashed border-border -translate-x-6" />
                  )}
                  <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-accent-from to-accent-to text-white font-semibold shadow-glow">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-foreground to-foreground/85 p-8 sm:p-12 lg:p-16 shadow-glow">
              <div className="absolute -top-24 -right-12 w-[26rem] h-[26rem] rounded-full bg-gradient-to-br from-accent-from to-accent-to opacity-40 blur-3xl animate-blob" aria-hidden="true" />
              <div className="absolute -bottom-32 left-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-accent-to to-accent-from opacity-25 blur-3xl animate-blob" style={{ animationDelay: '6s' }} aria-hidden="true" />
              <div className="relative z-10 max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-background">
                  Ready to discover what you have been missing?
                </h2>
                <p className="mt-4 text-background/70">
                  Join thousands of people finding their perfect activities every day.
                </p>
                <div className="mt-8">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-foreground bg-background rounded-full hover:opacity-90 transition-opacity shadow-soft"
                  >
                    Get started free
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
