'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'

type Step = 'email' | 'otp'

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [otpId, setOtpId] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [expiresIn, setExpiresIn] = useState(0)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await api.createOtp(email)
      setOtpId(response.otpId)
      setExpiresIn(response.expiresInSec)
      setStep('otp')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send verification code')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await api.verifyOtp(otpId, otpCode)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid verification code')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setError('')
    setIsLoading(true)

    try {
      const response = await api.createOtp(email)
      setOtpId(response.otpId)
      setExpiresIn(response.expiresInSec)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend code')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-accent-from to-accent-to shadow-glow">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-semibold text-lg text-foreground">Thendo</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {step === 'email' ? 'Welcome back' : 'Enter verification code'}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {step === 'email'
                ? 'Sign in to continue to your account'
                : `We sent a 6-digit code to ${email}`}
            </p>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 px-4 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending code...
                  </>
                ) : (
                  'Continue with email'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="code" className="text-sm font-medium text-foreground">
                  Verification code
                </label>
                <input
                  id="code"
                  type="text"
                  placeholder="000000"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full h-11 px-4 bg-background border border-border rounded-lg text-foreground text-center tracking-[0.3em] font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                  required
                  disabled={isLoading}
                  maxLength={6}
                  autoComplete="one-time-code"
                />
                <p className="text-xs text-muted-foreground text-center">
                  Code expires in {Math.floor(expiresIn / 60)} minutes
                </p>
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading || otpCode.length !== 6}
                className="w-full h-11 px-4 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  'Verify and continue'
                )}
              </button>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => {
                    setStep('email')
                    setOtpCode('')
                    setError('')
                  }}
                >
                  Change email
                </button>
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                >
                  Resend code
                </button>
              </div>
            </form>
          )}

          <p className="mt-8 text-xs text-muted-foreground text-center">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-foreground hover:underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-foreground hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="relative hidden lg:flex flex-1 bg-card border-l border-border items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-80" aria-hidden="true" />
        <div className="absolute -top-24 -right-16 w-96 h-96 rounded-full bg-gradient-to-br from-accent-from to-accent-to opacity-25 blur-3xl animate-blob" aria-hidden="true" />
        <div className="relative max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br from-accent-from to-accent-to text-white shadow-glow">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Discover activities you will love
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Our AI learns your preferences to suggest personalized experiences.
            No more endless scrolling or decision fatigue.
          </p>
        </div>
      </div>
    </div>
  )
}
