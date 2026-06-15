'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface PaymentResultProps {
  status: 'success' | 'cancel'
}

const REDIRECT_SECONDS = 5

export function PaymentResult({ status }: PaymentResultProps) {
  const router = useRouter()
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    const timeout = setTimeout(() => {
      router.push('/dashboard')
    }, REDIRECT_SECONDS * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [router])

  const isSuccess = status === 'success'
  const progress = ((REDIRECT_SECONDS - secondsLeft) / REDIRECT_SECONDS) * 100

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div
          className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${
            isSuccess ? 'bg-accent/10' : 'bg-destructive/10'
          }`}
        >
          {isSuccess ? (
            <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-8 w-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {isSuccess ? 'Payment successful' : 'Payment canceled'}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {isSuccess
            ? 'Thank you! Your Premium plan is now active. Enjoy unlimited personalized suggestions.'
            : 'No worries — your payment was not completed and you have not been charged. You can upgrade anytime.'}
        </p>

        {/* Countdown */}
        <div className="mt-8">
          <p className="text-xs text-muted-foreground">
            Redirecting to your dashboard in {secondsLeft}s
          </p>
          <div className="mx-auto mt-3 h-1 w-full max-w-xs overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                isSuccess ? 'bg-accent' : 'bg-muted-foreground'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Go to dashboard now
          </Link>
          {!isSuccess && (
            <Link
              href="/dashboard/subscription"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Try again
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
