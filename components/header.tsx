'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { User, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { isAuthenticated, isLoading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <span className="font-serif text-lg font-medium text-primary-foreground">t</span>
          </div>
          <span className="font-serif text-xl">thendo</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isLoading ? (
            <div className="h-9 w-20 animate-pulse rounded-full bg-muted" />
          ) : isAuthenticated ? (
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/dashboard">
                <User className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="rounded-full">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full">
                <Link href="/login">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 hover:bg-muted md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-b border-border bg-background md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="/#features"
              className="rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="my-2 border-t border-border" />
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
