'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
    description: 'Perfect for getting started',
    features: [
      '100 credits per month',
      'Basic analytics',
      'Email support',
      'API access',
      '1 team member',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Premium',
    code: 'PREMIUM',
    price: '$29',
    period: '/month',
    description: 'For growing teams and businesses',
    features: [
      'Unlimited credits',
      'Advanced analytics',
      'Priority support',
      'Full API access',
      'Unlimited team members',
      'Custom integrations',
      'SSO authentication',
      'Dedicated account manager',
    ],
    cta: 'Upgrade to Premium',
    popular: true,
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
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Choose the plan that works best for you. Upgrade or downgrade at any time.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2">
            {plans.map((plan) => {
              const isCurrentPlan = subscription?.plan === plan.code
              
              return (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col overflow-hidden ${
                    plan.popular
                      ? 'border-primary shadow-lg shadow-primary/10'
                      : 'border-border/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">{plan.period}</span>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex flex-1 flex-col">
                    <ul className="flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-5 w-5 shrink-0 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8">
                      {plan.code === 'FREE' ? (
                        <Button
                          asChild
                          variant="outline"
                          className="w-full"
                          disabled={isCurrentPlan}
                        >
                          <Link href="/login">
                            {isCurrentPlan ? 'Current Plan' : plan.cta}
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
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
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* FAQ Section */}
          <div className="mx-auto mt-24 max-w-3xl">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">
              Frequently asked questions
            </h2>
            
            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-lg font-semibold">Can I change plans later?</h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">What payment methods do you accept?</h3>
                <p className="mt-2 text-muted-foreground">
                  We accept all major credit cards through our secure payment processor, Stripe.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Is there a free trial?</h3>
                <p className="mt-2 text-muted-foreground">
                  Our Free plan lets you explore all core features. Upgrade to Premium when you need more.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">What happens when I run out of credits?</h3>
                <p className="mt-2 text-muted-foreground">
                  Free plan users receive 100 credits monthly. Premium users get unlimited credits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
