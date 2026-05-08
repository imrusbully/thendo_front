'use client'

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CreditCard, Sparkles, TrendingUp, ArrowRight, Heart, MapPin, Clock } from 'lucide-react'

export default function DashboardPage() {
  const { user, subscription } = useAuth()

  const stats = [
    {
      name: 'Plan',
      value: subscription?.plan || 'FREE',
      icon: CreditCard,
      description: subscription?.status === 'ACTIVE' ? 'Active' : 'Active',
    },
    {
      name: 'Credits',
      value: subscription?.creditBalance?.balance?.toString() || '100',
      icon: Sparkles,
      description: 'Available this month',
    },
    {
      name: 'Monthly Limit',
      value: subscription?.entitlements?.monthlyCredits?.toString() || '100',
      icon: TrendingUp,
      description: 'Credits per month',
    },
  ]

  const recentActivity = [
    { icon: Heart, text: 'Saved "Sunset Hike at Eagle Point"', time: '2 hours ago' },
    { icon: MapPin, text: 'Discovered new spots in Downtown', time: 'Yesterday' },
    { icon: Clock, text: 'Completed weekend activity plan', time: '3 days ago' },
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-medium">
          Welcome back, {user?.email?.split('@')[0]}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Ready to discover your next adventure?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.name}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-serif text-3xl font-medium">{stat.value}</span>
              <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-medium">Quick Actions</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account
          </p>
          <div className="mt-6 space-y-2">
            <Button asChild variant="outline" className="h-12 w-full justify-between rounded-xl">
              <Link href="/dashboard/profile">
                View Profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 w-full justify-between rounded-xl">
              <Link href="/dashboard/subscription">
                Manage Subscription
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 w-full justify-between rounded-xl">
              <Link href="/pricing">
                View Plans
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-medium">Recent Activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your latest discoveries
          </p>
          <div className="mt-6 space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <activity.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upgrade CTA */}
      {subscription?.plan === 'FREE' && (
        <div className="rounded-2xl bg-primary p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-medium text-primary-foreground">
                Unlock unlimited discoveries
              </h2>
              <p className="mt-2 text-primary-foreground/80">
                Upgrade to Premium for unlimited suggestions, mood-based recommendations, and more.
              </p>
            </div>
            <Button asChild variant="secondary" size="lg" className="shrink-0 rounded-full">
              <Link href="/pricing">
                Upgrade Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
