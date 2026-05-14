import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <header className="py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">
            Brandito
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center py-12">
        {children}
      </main>
    </div>
  )
}
