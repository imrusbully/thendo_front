'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { api } from '@/lib/api'

export default function SubscriptionPage() {
  const { subscription, refreshUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isCanceling, setIsCanceling] = useState(false)
  const [isResuming, setIsResuming] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpgrade = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.checkout()
      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async () => {
    setIsCanceling(true)
    setError(null)
    try {
      await api.cancelSubscription()
      await refreshUser()
      setShowCancelConfirm(false)
    } catch (err) {
      console.error('Cancel error:', err)
      setError('Could not cancel subscription. Please try again.')
    } finally {
      setIsCanceling(false)
    }
  }

  const handleResume = async () => {
    setIsResuming(true)
    setError(null)
    try {
      await api.resumeSubscription()
      await refreshUser()
    } catch (err) {
      console.error('Resume error:', err)
      setError('Could not restore subscription. Please try again.')
    } finally {
      setIsResuming(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const isPremium = subscription?.plan === 'PREMIUM'
  const isUnlimited = subscription?.entitlements?.unlimited
  const isCanceled = subscription?.status === 'CANCELED'
  const cancelAtPeriodEnd = subscription?.cancelAtPeriodEnd === true
  const endingSoon = cancelAtPeriodEnd || isCanceled
  const monthlyLimit = subscription?.entitlements?.monthlyLimit ?? 0
  const remaining = subscription?.quota?.remaining ?? 0
  const used = Math.max(monthlyLimit - remaining, 0)
  const usagePercent = monthlyLimit > 0 ? Math.min((used / monthlyLimit) * 100, 100) : 0

  const statusStyles: Record<string, { dot: string; pill: string }> = {
    ACTIVE: { dot: 'bg-accent', pill: 'bg-accent/10 text-accent' },
    PENDING: { dot: 'bg-muted-foreground', pill: 'bg-muted text-muted-foreground' },
    GRACE: { dot: 'bg-amber-500', pill: 'bg-amber-500/10 text-amber-600' },
    CANCELED: { dot: 'bg-destructive', pill: 'bg-destructive/10 text-destructive' },
    EXPIRED: { dot: 'bg-muted-foreground', pill: 'bg-muted text-muted-foreground' },
  }
  const statusKey = subscription?.status || 'ACTIVE'
  const statusStyle = statusStyles[statusKey] || statusStyles.ACTIVE

  const premiumFeatures = [
    'Unlimited personalized suggestions',
    'Mood-based recommendations',
    'Social activity matching',
    'Exclusive experiences',
    'Priority support',
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Subscription</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your plan and billing</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Current Plan */}
      <div className="relative p-6 rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Current plan</h2>
            <p className="mt-1 text-sm text-muted-foreground">Your subscription details</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${statusStyle.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
            {statusKey}
          </span>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between p-6 rounded-xl border border-border bg-background/50">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPremium ? 'bg-gradient-to-br from-accent-from to-accent-to text-white shadow-glow' : 'bg-foreground text-background'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{subscription?.plan || 'FREE'}</p>
                <p className="text-sm text-muted-foreground">
                  {isPremium ? '$9/month' : 'Free forever'}
                </p>
              </div>
            </div>
            {!isPremium ? (
              <button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Upgrade
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            ) : (
              <Link
                href="/pricing"
                className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
              >
                View plans
              </Link>
            )}
          </div>

          {subscription?.currentPeriodEnd && (
            <div className="mt-4 flex items-center gap-3 p-4 rounded-xl border border-border bg-background/50">
              <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-xs text-muted-foreground">
                  {endingSoon ? 'Access until' : 'Next billing'}
                </p>
                <p className="text-sm font-medium text-foreground">{formatDate(subscription.currentPeriodEnd)}</p>
              </div>
            </div>
          )}

          {/* Restore subscription (premium + scheduled-for-cancel) */}
          {isPremium && cancelAtPeriodEnd && (
            <div className="mt-4 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M4.93 19h14.14a2 2 0 001.74-2.99l-7.07-12.25a2 2 0 00-3.48 0L3.19 16.01A2 2 0 004.93 19z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Subscription set to end</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your Premium plan ends on {subscription?.currentPeriodEnd ? formatDate(subscription.currentPeriodEnd) : 'the next billing date'}.
                    Restore it now to keep your benefits and avoid losing access.
                  </p>
                  <button
                    onClick={handleResume}
                    disabled={isResuming}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-br from-accent-from to-accent-to hover:opacity-90 transition-opacity disabled:opacity-50 shadow-glow"
                  >
                    {isResuming ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Restoring...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Restore subscription
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cancel subscription (premium, not scheduled, not yet canceled) */}
          {isPremium && !cancelAtPeriodEnd && !isCanceled && (
            <div className="mt-4">
              {!showCancelConfirm ? (
                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
                >
                  Cancel subscription
                </button>
              ) : (
                <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5">
                  <p className="text-sm font-medium text-foreground">Cancel your Premium plan?</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You will keep access until the end of your current billing period.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={handleCancel}
                      disabled={isCanceling}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isCanceling ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Canceling...
                        </>
                      ) : (
                        'Yes, cancel'
                      )}
                    </button>
                    <button
                      onClick={() => setShowCancelConfirm(false)}
                      disabled={isCanceling}
                      className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
                    >
                      Keep plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {isCanceled && (
            <div className="mt-4 p-4 rounded-xl border border-border bg-muted/40 text-sm text-muted-foreground">
              Your subscription is canceled and will not renew.
            </div>
          )}
        </div>
      </div>

      {/* Usage */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-soft">
        <h2 className="text-lg font-semibold text-foreground">Usage</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your suggestions this period</p>

        <div className="mt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-from to-accent-to flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-semibold text-foreground">
                {isUnlimited ? '∞' : remaining}
                {!isUnlimited && (
                  <span className="text-lg font-normal text-muted-foreground">
                    {' / '}{monthlyLimit}
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {isUnlimited ? 'Unlimited suggestions' : 'suggestions remaining'}
              </p>
            </div>
          </div>

          {!isUnlimited && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Used this period</span>
                <span className="font-medium text-foreground">{usagePercent.toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-from to-accent-to rounded-full transition-all"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
              {subscription?.quota?.periodEnd && (
                <p className="text-xs text-muted-foreground pt-1">
                  Resets on {formatDate(subscription.quota.periodEnd)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Upgrade CTA for Free users */}
      {!isPremium && (
        <div className="relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-foreground to-foreground/85 shadow-glow">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-accent-from to-accent-to opacity-30 blur-3xl animate-blob" />
          <div className="relative">
            <h2 className="text-xl font-semibold text-background">Unlock Premium</h2>
            <p className="mt-2 text-sm text-background/70">
              Get unlimited discoveries and exclusive features
            </p>

            <ul className="mt-6 space-y-3">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-background">
                  <svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-foreground bg-background rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Upgrade for $9/month
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
