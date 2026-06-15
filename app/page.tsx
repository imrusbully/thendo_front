import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ActivityShowcase } from '@/components/activity-showcase'

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Smart Suggestions',
    description: 'AI learns your preferences to deliver activities you will actually enjoy.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Local Discovery',
    description: 'Find hidden gems and popular spots wherever you are.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Time-Aware',
    description: 'Suggestions that fit your schedule, from 30 minutes to full days.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'For Everyone',
    description: 'Solo adventures, date nights, or group activities. We have it all.',
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

const stats = [
  { value: '50K+', label: 'Active users' },
  { value: '100K+', label: 'Activities suggested' },
  { value: '4.9', label: 'App rating' },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-accent bg-accent/10 rounded-full">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                Now with AI-powered suggestions
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1]">
                Stop scrolling.
                <br />
                <span className="text-muted-foreground">Start living.</span>
              </h1>
              
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                Thendo uses AI to suggest personalized activities based on your mood, 
                location, and preferences. No more decision fatigue.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity"
                >
                  Get started free
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  View pricing
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl sm:text-3xl font-semibold text-foreground">{stat.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Activity Showcase - scroll-driven diagonal image blocks */}
        <ActivityShowcase />

        {/* Features */}
        <section id="features" className="py-20 sm:py-28 bg-card border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                Built for modern life
              </h2>
              <p className="mt-4 text-muted-foreground">
                Everything you need to discover activities that match your lifestyle.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="group">
                  <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-lg bg-foreground text-background">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-20 sm:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                How it works
              </h2>
              <p className="mt-4 text-muted-foreground">
                Get personalized recommendations in three simple steps.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <div key={step.step} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-px bg-border -translate-x-6" />
                  )}
                  <div className="text-xs font-medium text-accent mb-4">{step.step}</div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-foreground p-8 sm:p-12 lg:p-16">
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-foreground bg-background rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Get started free
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.5" className="text-background" />
                  <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.5" className="text-background" />
                  <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="0.5" className="text-background" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
