import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <span className="font-serif text-lg font-medium text-primary-foreground">t</span>
              </div>
              <span className="font-serif text-xl">thendo</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Discover personalized activities and experiences that match your vibe.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} Thendo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
