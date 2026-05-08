'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { ArrowLeft, Loader2, Mail, KeyRound, Sparkles } from 'lucide-react'

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
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <span className="font-serif text-lg font-medium text-primary-foreground">t</span>
              </div>
              <span className="font-serif text-xl">thendo</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="font-serif text-3xl font-medium">
              {step === 'email' ? 'Welcome back' : 'Check your email'}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {step === 'email'
                ? 'Enter your email to continue your journey'
                : `We sent a code to ${email}`}
            </p>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl pl-11"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" className="h-12 w-full rounded-xl" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending code...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="code" className="text-sm font-medium">
                  Verification code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="h-12 rounded-xl pl-11 text-center tracking-[0.5em]"
                    required
                    disabled={isLoading}
                    maxLength={6}
                  />
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Code expires in {Math.floor(expiresIn / 60)} minutes
                </p>
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" className="h-12 w-full rounded-xl" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Continue'
                )}
              </Button>

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setStep('email')
                    setOtpCode('')
                    setError('')
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                >
                  Resend code
                </Button>
              </div>
            </form>
          )}

          <p className="mt-8 text-center text-xs text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link href="#" className="underline hover:text-foreground">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="#" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden flex-1 bg-muted lg:block">
        <div className="flex h-full flex-col items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-medium">
              Your perfect moments await
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Join thousands of explorers discovering personalized activities 
              and experiences tailored just for them.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
