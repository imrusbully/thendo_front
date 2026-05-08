'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useAuth } from '@/lib/auth-context'
import { api } from '@/lib/api'
import { Check, Loader2 } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: 'Free',
    code: 'FREE',
    price: '$0',
    description: 'Start exploring with basics',
    features: [
      '100 personalized suggestions per month',
      'Basic activity categories',
      'Save up to 10 favorites',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Premium',
    code: 'PREMIUM',
    price: '$9',
    period: '/month',
    description: 'Unlock the full experience',
    features: [
      'Unlimited personalized suggestions',
      'All activity categories',
      'Unlimited favorites & lists',
      'Priority support',
      'Mood-based recommendations',
      'Social activity matching',
      'Exclusive local experiences',
      'Early access to new features',
    ],
    cta: 'Upgrade to Premium',
    popular: true,
  },
]

const faqs = [
  {
    question: 'How does Thendo personalize recommendations?',
    answer: 'Thendo learns from your preferences, past activities, mood, and feedback to suggest experiences that match your unique style. The more you use it, the better it gets.',
  },
  {
    question: 'Can I switch plans anytime?',
    answer: 'Yes! You can upgrade to Premium or downgrade to Free at any time. Changes take effect immediately.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards through our secure payment processor, Stripe. Your payment information is never stored on our servers.',
  },
  {
    question: 'Is there a free trial for Premium?',
    answer: 'Our Free plan lets you explore all core features. Try it out, and upgrade to Premium when you want unlimited access.',
  },
]

export default function PricingPage() {
  const { isAuthenticated, subscription } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    setIsLoading(true)
    try {
      const response = await api.checkout()
      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Simple, honest pricing
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free. Upgrade when you are ready for more.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-8 lg:grid-cols-2">
            {plans.map((plan) => {
              const isCurrentPlan = subscription?.plan === plan.code
              
              return (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-3xl border p-8 ${
                    plan.popular
                      ? 'border-primary bg-card shadow-lg'
                      : 'border-border bg-card/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-8 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h2 className="font-serif text-2xl font-medium">{plan.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  
                  <div className="mb-8">
                    <span className="font-serif text-5xl font-medium">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                  
                  <ul className="mb-8 flex-1 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div>
                    {plan.code === 'FREE' ? (
                      <Button
                        asChild
                        variant="outline"
                        className="h-12 w-full rounded-xl"
                        disabled={isCurrentPlan}
                      >
                        <Link href="/login">
                          {isCurrentPlan ? 'Current Plan' : plan.cta}
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        className="h-12 w-full rounded-xl"
                        onClick={handleUpgrade}
                        disabled={isLoading || isCurrentPlan}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : isCurrentPlan ? (
                          'Current Plan'
                        ) : (
                          plan.cta
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* FAQ Section */}
          <div className="mx-auto mt-24 max-w-2xl">
            <h2 className="text-center font-serif text-2xl font-medium sm:text-3xl">
              Questions? We have answers.
            </h2>
            
            <div className="mt-12 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
