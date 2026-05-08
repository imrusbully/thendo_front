'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LayoutDashboard, User, CreditCard, LogOut, Menu, X, Settings, Compass } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Subscription', href: '/dashboard/subscription', icon: CreditCard },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <span className="font-serif text-lg font-medium text-primary-foreground">t</span>
              </div>
              <span className="font-serif text-xl">thendo</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary/10 font-medium text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto w-full justify-start gap-3 rounded-xl px-3 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 font-medium text-primary">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">{user?.email?.split('@')[0]}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 rounded-xl">
                <DropdownMenuItem asChild className="rounded-lg">
                  <Link href="/dashboard/profile">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg">
                  <Link href="/">
                    <Compass className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="rounded-lg text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <span className="font-serif text-lg font-medium text-primary-foreground">t</span>
            </div>
            <span className="font-serif text-xl">thendo</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-border bg-card p-4 lg:hidden">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
              <div className="my-2 border-t border-border" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-destructive transition-colors hover:bg-muted"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
