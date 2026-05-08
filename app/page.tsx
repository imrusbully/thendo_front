import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Zap, Shield, BarChart3, Clock, ArrowRight, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Experience blazing-fast performance with our optimized infrastructure.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and security protocols to protect your data.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Gain deep insights with comprehensive analytics and reporting.',
  },
  {
    icon: Clock,
    title: 'Real-time Sync',
    description: 'Instant synchronization across all your devices and platforms.',
  },
]

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
  { value: '50+', label: 'Integrations' },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
          </div>
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Introducing Thendo 2.0</span>
              </div>
              
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Supercharge Your{' '}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Productivity
                </span>
              </h1>
              
              <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
                Thendo is the all-in-one platform that helps teams collaborate, automate workflows, 
                and achieve more together. Start your journey to peak productivity today.
              </p>
              
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/login">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold sm:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="border-t border-border bg-muted/30 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to succeed
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                Powerful features designed to help you work smarter, not harder.
              </p>
            </div>
            
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center sm:px-16 sm:py-24">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-foreground/10 via-transparent to-transparent" />
              
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to transform your workflow?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/80">
                Join thousands of teams already using Thendo to achieve their goals.
              </p>
              
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Link href="/login">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto">
                  <Link href="/pricing">See Plans</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
