'use client'

import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, subscription } = useAuth()

  const isUnlimited = subscription?.entitlements?.unlimited
  const stats = [
    {
      name: 'Plan',
      value: subscription?.plan || 'FREE',
      description: 'Current plan',
    },
    {
      name: 'Remaining',
      value: isUnlimited ? '∞' : (subscription?.quota?.remaining?.toString() ?? '—'),
      description: 'Suggestions left',
    },
    {
      name: 'Limit',
      value: isUnlimited ? 'Unlimited' : (subscription?.entitlements?.monthlyLimit?.toString() ?? '—'),
      description: 'Monthly limit',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">Overview</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back, {user?.email?.split('@')[0]}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here is an overview of your account.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
        {stats.map((stat) => (
          <div key={stat.name} className="p-6 bg-card">
            <div className="w-8 h-0.5 bg-accent mb-4" />
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.name}</p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-foreground">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="p-6 border border-foreground/12 bg-card">
          <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage your account</p>

          <div className="mt-6 space-y-2">
            <Link
              href="/dashboard/profile"
              className="flex items-center justify-between p-4 border border-foreground/12 hover:border-accent hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium text-foreground">View Profile</span>
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/dashboard/subscription"
              className="flex items-center justify-between p-4 border border-foreground/12 hover:border-accent hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium text-foreground">Manage Subscription</span>
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="flex items-center justify-between p-4 border border-foreground/12 hover:border-accent hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium text-foreground">View Plans</span>
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 border border-foreground/12 bg-card">
          <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">Your latest actions</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 bg-muted flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-foreground">Logged in to your account</p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 bg-muted flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-foreground">Account created</p>
                <p className="text-xs text-muted-foreground">Welcome to Thendo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade CTA */}
      {subscription?.plan === 'FREE' && (
        <div className="relative overflow-hidden p-8 bg-ink">
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-accent opacity-30 blur-3xl animate-blob" aria-hidden="true" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Unlock unlimited suggestions
              </h2>
              <p className="mt-1 text-sm text-white/70">
                Upgrade to Premium for unlimited access and exclusive features.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-accent-foreground bg-accent hover:opacity-90 transition-opacity shrink-0"
            >
              Upgrade now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
