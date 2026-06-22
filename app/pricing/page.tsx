'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useAuth } from '@/lib/auth-context'
import { api } from '@/lib/api'
import { useState } from 'react'

const plans = [
  {
    name: 'Free',
    code: 'FREE',
    price: '$0',
    description: 'Get started with the basics',
    features: [
      '100 suggestions per month',
      'Basic categories',
      'Save up to 10 favorites',
      'Email support',
    ],
    cta: 'Get started',
    popular: false,
  },
  {
    name: 'Premium',
    code: 'PREMIUM',
    price: '$9',
    period: '/month',
    description: 'Unlock the full experience',
    features: [
      'Unlimited suggestions',
      'All activity categories',
      'Unlimited favorites',
      'Priority support',
      'Mood-based recommendations',
      'Social activity matching',
      'Exclusive experiences',
      'Early access to features',
    ],
    cta: 'Upgrade to Premium',
    popular: true,
  },
]

const faqs = [
  {
    question: 'How does Thendo personalize recommendations?',
    answer: 'Thendo learns from your preferences, past activities, and feedback to suggest experiences that match your style. The more you use it, the better it gets.',
  },
  {
    question: 'Can I switch plans anytime?',
    answer: 'Yes. You can upgrade or downgrade at any time. Changes take effect immediately.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards through Stripe. Your payment information is never stored on our servers.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Our Free plan lets you explore core features with no time limit. Upgrade to Premium when you want unlimited access.',
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
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="relative flex-1 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[28rem] bg-mesh opacity-90 -z-10" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Simple <span className="text-gradient-accent">pricing</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Start free. Upgrade when you need more.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => {
              const isCurrentPlan = subscription?.plan === plan.code

              return (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-2xl border p-8 transition-shadow ${
                    plan.popular
                      ? 'border-transparent bg-card shadow-glow ring-gradient-accent'
                      : 'border-border bg-card shadow-soft'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-6 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-br from-accent-from to-accent-to">
                      Popular
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground">{plan.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-semibold text-foreground">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                  
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div>
                    {plan.code === 'FREE' ? (
                      <Link
                        href="/login"
                        className={`inline-flex items-center justify-center w-full h-11 px-4 text-sm font-medium border border-border rounded-full transition-colors ${
                          isCurrentPlan 
                            ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        {isCurrentPlan ? 'Current plan' : plan.cta}
                      </Link>
                    ) : (
                      <button
                        onClick={handleUpgrade}
                        disabled={isLoading || isCurrentPlan}
                        className={`inline-flex items-center justify-center w-full h-11 px-4 text-sm font-medium rounded-full transition-all ${
                          isCurrentPlan
                            ? 'bg-muted text-muted-foreground cursor-not-allowed'
                            : 'text-white bg-gradient-to-br from-accent-from to-accent-to hover:opacity-90 shadow-glow'
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing...
                          </>
                        ) : isCurrentPlan ? (
                          'Current plan'
                        ) : (
                          plan.cta
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto mt-24">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground text-center mb-12">
              Frequently asked questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="p-6 rounded-2xl border border-border bg-card shadow-soft">
                  <h3 className="font-medium text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
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
