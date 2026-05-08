'use client'

import { useAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CreditCard, Zap, TrendingUp, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const { user, subscription } = useAuth()

  const stats = [
    {
      name: 'Current Plan',
      value: subscription?.plan || 'FREE',
      icon: CreditCard,
      description: subscription?.status === 'ACTIVE' ? 'Active' : subscription?.status || 'Active',
    },
    {
      name: 'Credits Balance',
      value: subscription?.creditBalance?.balance?.toString() || '0',
      icon: Zap,
      description: 'Available credits',
    },
    {
      name: 'Monthly Credits',
      value: subscription?.entitlements?.monthlyCredits?.toString() || '100',
      icon: TrendingUp,
      description: 'Credits per month',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back, {user?.email?.split('@')[0]}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your account and subscription
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-between">
              <Link href="/dashboard/profile">
                View Profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-between">
              <Link href="/dashboard/subscription">
                Manage Subscription
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-between">
              <Link href="/pricing">
                View Pricing Plans
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {subscription?.plan === 'FREE' && (
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle>Upgrade to Premium</CardTitle>
              <CardDescription>
                Get unlimited credits and premium features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Unlimited credits
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Advanced features
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/pricing">Upgrade Now</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
