import { notFound } from "next/navigation"
import { getProfessionalBySlug, getActiveServices, getAvailability, getBookingsForDate } from "@/lib/db"
import { PublicProfileClient } from "./public-profile-client"
import Link from "next/link"
import { Calendar } from "lucide-react"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params

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
  params: { slug: string }
}) {
  const { slug } = params

  const professional = await getProfessionalBySlug(slug)

  if (!professional) notFound()

  const [services, availability] = await Promise.all([
    getActiveServices(professional.id),
    getAvailability(professional.id),
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-sm shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
              <Calendar className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">CitaGest</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Iniciar sesión</Link>
            <Link href="/register" className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg font-medium hover:brightness-110 transition">Registrarse</Link>
          </div>
        </div>
      </header>

      <PublicProfileClient
        professional={professional}
        services={services}
        availability={availability}
      />

      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Agenda gestionada con{" "}
            <Link href="/" className="text-primary font-medium hover:underline">CitaGest</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}