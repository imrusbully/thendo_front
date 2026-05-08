import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArrowRight, Sparkles, MapPin, Heart, Clock, Users } from 'lucide-react'

const categories = [
  {
    title: 'Outdoor Adventures',
    description: 'Hiking, cycling, and nature exploration',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
  },
  {
    title: 'Food & Drinks',
    description: 'Restaurants, cafes, and culinary experiences',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
  },
  {
    title: 'Culture & Arts',
    description: 'Museums, galleries, and performances',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=300&fit=crop',
  },
  {
    title: 'Wellness',
    description: 'Yoga, spa, and mindful activities',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
  },
]

const features = [
  {
    icon: Heart,
    title: 'Personalized for You',
    description: 'AI-powered recommendations based on your preferences, mood, and past experiences.',
  },
  {
    icon: MapPin,
    title: 'Local Discovery',
    description: 'Find hidden gems and popular spots in your area or wherever you travel.',
  },
  {
    icon: Clock,
    title: 'Perfect Timing',
    description: 'Get suggestions that fit your schedule, whether you have 30 minutes or a full day.',
  },
  {
    icon: Users,
    title: 'Social or Solo',
    description: 'Activities for every occasion - date nights, friend groups, or peaceful solo time.',
  },
]

const testimonials = [
  {
    quote: "Thendo helped me discover amazing places in my own city that I never knew existed.",
    author: "Alex K.",
    role: "Urban Explorer",
  },
  {
    quote: "Finally an app that understands what I actually want to do, not just what's popular.",
    author: "Sam M.",
    role: "Weekend Adventurer",
  },
  {
    quote: "The personalized suggestions are spot-on. It's like having a friend who knows all the best spots.",
    author: "Jordan R.",
    role: "Food Enthusiast",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-24 sm:pt-44 sm:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Personalized experiences await</span>
              </div>
              
              <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
                Discover your
                <br />
                <span className="text-primary">perfect moments</span>
              </h1>
              
              <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Thendo learns what you love and suggests personalized activities, 
                experiences, and places that match your vibe. No more endless scrolling.
              </p>
              
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/login">
                    Start Discovering
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="rounded-full">
                  <Link href="/pricing">See Plans</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-medium sm:text-4xl">
                Explore what moves you
              </h2>
              <p className="mt-4 text-muted-foreground">
                From quiet coffee shops to thrilling adventures
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.title}
                  href="/login"
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <div className="aspect-[4/5]">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-card">
                      <h3 className="text-lg font-medium">{category.title}</h3>
                      <p className="mt-1 text-sm opacity-80">{category.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-y border-border bg-card py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="font-serif text-3xl font-medium sm:text-4xl">
                How Thendo works for you
              </h2>
              <p className="mt-4 text-muted-foreground">
                Smart suggestions that actually get you
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-lg font-medium">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="font-serif text-3xl font-medium sm:text-4xl">
                Loved by explorers
              </h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="rounded-2xl border border-border bg-card p-8"
                >
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-6">
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16 sm:py-24">
              <h2 className="mx-auto max-w-xl font-serif text-3xl font-medium text-primary-foreground sm:text-4xl">
                Ready to discover something new?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
                Join thousands of people finding their perfect moments every day.
              </p>
              
              <div className="mt-10">
                <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
                  <Link href="/login">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
