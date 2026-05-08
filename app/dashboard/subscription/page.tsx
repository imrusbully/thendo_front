'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CreditCard, Sparkles, Calendar, Loader2, ArrowRight, Check } from 'lucide-react'

export default function SubscriptionPage() {
  const { subscription } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'default'
      case 'GRACE':
        return 'secondary'
      case 'CANCELLED':
      case 'EXPIRED':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const creditUsagePercent = subscription?.entitlements?.monthlyCredits
    ? Math.min(
        ((subscription.creditBalance?.balance || 0) /
          subscription.entitlements.monthlyCredits) *
          100,
        100
      )
    : 0

  const premiumFeatures = [
    'Unlimited personalized suggestions',
    'Mood-based recommendations',
    'Social activity matching',
    'Exclusive local experiences',
    'Priority support',
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-medium">Subscription</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your plan and billing
        </p>
      </div>

      {/* Current Plan */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-medium">Current Plan</h2>
            <p className="mt-1 text-sm text-muted-foreground">Your subscription details</p>
          </div>
          <Badge variant={getStatusColor(subscription?.status || 'ACTIVE')} className="rounded-lg">
            {subscription?.status || 'ACTIVE'}
          </Badge>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <CreditCard className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="font-serif text-2xl font-medium">{subscription?.plan || 'FREE'}</p>
                <p className="text-sm text-muted-foreground">
                  {subscription?.plan === 'PREMIUM' ? '$9/month' : 'Free forever'}
                </p>
              </div>
            </div>
            {subscription?.plan === 'FREE' ? (
              <Button onClick={handleUpgrade} disabled={isLoading} className="rounded-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Upgrade
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button variant="outline" asChild className="rounded-full">
                <Link href="/pricing">View Plans</Link>
              </Button>
            )}
          </div>

          {subscription?.currentPeriodEnd && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-border p-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {subscription.status === 'CANCELLED' ? 'Access until' : 'Next billing'}
                </p>
                <p className="font-medium">{formatDate(subscription.currentPeriodEnd)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Credits Usage */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-xl font-medium">Credits</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your monthly usage</p>
        
        <div className="mt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="font-serif text-3xl font-medium">
                {subscription?.creditBalance?.balance || 0}
                <span className="text-lg font-normal text-muted-foreground">
                  {' / '}
                  {subscription?.entitlements?.monthlyCredits === -1
                    ? 'Unlimited'
                    : subscription?.entitlements?.monthlyCredits || 100}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">credits available</p>
            </div>
          </div>

          {subscription?.entitlements?.monthlyCredits !== -1 && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Usage this month</span>
                <span className="font-medium">{creditUsagePercent.toFixed(0)}%</span>
              </div>
              <Progress value={creditUsagePercent} className="h-2" />
            </div>
          )}
        </div>
      </div>

      {/* Upgrade CTA for Free users */}
      {subscription?.plan === 'FREE' && (
        <div className="rounded-2xl bg-primary p-8">
          <h2 className="font-serif text-2xl font-medium text-primary-foreground">
            Unlock Premium
          </h2>
          <p className="mt-2 text-primary-foreground/80">
            Get unlimited discoveries and exclusive features
          </p>
          
          <ul className="mt-6 space-y-3">
            {premiumFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-primary-foreground">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground/20">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          
          <Button 
            variant="secondary" 
            size="lg"
            className="mt-8 w-full rounded-full"
            onClick={handleUpgrade}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Upgrade for $9/month
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
