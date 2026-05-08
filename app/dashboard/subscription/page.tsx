'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { api } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CreditCard, Zap, Calendar, Loader2, ArrowRight } from 'lucide-react'

export default function SubscriptionPage() {
  const { subscription, refreshUser } = useAuth()
  const router = useRouter()
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

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Subscription</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your subscription and billing
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your active subscription details</CardDescription>
            </div>
            <Badge variant={getStatusColor(subscription?.status || 'ACTIVE')}>
              {subscription?.status || 'ACTIVE'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{subscription?.plan || 'FREE'}</p>
                <p className="text-sm text-muted-foreground">
                  {subscription?.plan === 'PREMIUM'
                    ? '$29/month'
                    : 'Free forever'}
                </p>
              </div>
            </div>
            {subscription?.plan === 'FREE' ? (
              <Button onClick={handleUpgrade} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Upgrade to Premium
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/pricing">View Plans</Link>
              </Button>
            )}
          </div>

          {subscription?.currentPeriodEnd && (
            <div className="flex items-center gap-3 rounded-lg border border-border p-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {subscription.status === 'CANCELLED'
                    ? 'Access until'
                    : 'Next billing date'}
                </p>
                <p className="font-medium">
                  {formatDate(subscription.currentPeriodEnd)}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Credits Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Credits Usage</CardTitle>
          <CardDescription>
            Your monthly credit balance and usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Available Credits</p>
                <p className="text-2xl font-bold">
                  {subscription?.creditBalance?.balance || 0}
                  <span className="text-base font-normal text-muted-foreground">
                    {' '}
                    /{' '}
                    {subscription?.entitlements?.monthlyCredits === -1
                      ? 'Unlimited'
                      : subscription?.entitlements?.monthlyCredits || 100}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {subscription?.entitlements?.monthlyCredits !== -1 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Usage this month</span>
                <span className="font-medium">{creditUsagePercent.toFixed(0)}%</span>
              </div>
              <Progress value={creditUsagePercent} className="h-2" />
            </div>
          )}

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h4 className="font-medium">Plan Benefits</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                {subscription?.entitlements?.monthlyCredits === -1
                  ? 'Unlimited'
                  : subscription?.entitlements?.monthlyCredits || 100}{' '}
                credits per month
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                {subscription?.entitlements?.premium
                  ? 'Premium features included'
                  : 'Basic features'}
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade CTA for Free users */}
      {subscription?.plan === 'FREE' && (
        <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold">Need more credits?</h3>
              <p className="text-sm text-muted-foreground">
                Upgrade to Premium for unlimited credits and premium features.
              </p>
            </div>
            <Button onClick={handleUpgrade} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Upgrade Now'
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
