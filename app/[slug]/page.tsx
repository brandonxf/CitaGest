import { notFound } from "next/navigation"
import { getProfessionalBySlug, getActiveServices, getAvailability } from "@/lib/db"
import { PublicProfileClient } from "@/components/pro/public-profile-client"
import Link from "next/link"
import { Calendar } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const professional = await getProfessionalBySlug(slug)
  if (!professional) return { title: "Profesional no encontrado" }
  return {
    title: `${professional.name} | CitaGest`,
    description: professional.description || `Reserva una cita con ${professional.name}`,
  }
}

export default async function ProfessionalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const professional = await getProfessionalBySlug(slug)
  if (!professional) notFound()

  const [services, availability] = await Promise.all([
    getActiveServices(professional.id),
    getAvailability(professional.id),
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Header minimalista — solo logo, sin botones de sesión */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-sm shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
              <Calendar className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">CitaGest</span>
          </Link>
          <Link
            href="/"
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            ¿Eres profesional? →
          </Link>
        </div>
      </header>

      <PublicProfileClient
        professional={professional}
        services={services}
        availability={availability}
      />

      <footer className="border-t border-border/50 py-6 mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-muted-foreground/50">
            Agenda gestionada con{" "}
            <Link href="/" className="text-primary/70 hover:text-primary transition-colors font-medium">CitaGest</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}