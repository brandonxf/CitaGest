export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card/60 p-6 shadow-sm">
        <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
        <div className="mt-4 h-4 w-1/2 bg-muted rounded animate-pulse" />
        <div className="mt-6 h-10 w-full bg-muted rounded animate-pulse" />
      </div>
    </div>
  )
}

