import { notFound } from "next/navigation"
import Link from "next/link"
import { getProfessionalBySlug } from "@/lib/db"
import { Calendar, Clock, Users, Shield } from "lucide-react"

export default async function ProfessionalPage({
  params,
}: {
  params: { slug: string }
}) {
  const professional = await getProfessionalBySlug(params.slug)

  if (!professional) {
    notFound()
  }

  // Nota: si quieres mostrar disponibilidad/servicios en el perfil, aquí se conectan
  // `getActiveServices`/`getAvailability`/etc.

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm shadow-primary/25 group-hover:shadow-primary/50 transition-shadow">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">CitaGest</span>
            </Link>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Iniciar sesión
              </Link>
              <Link href="/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Crear cuenta
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero del profesional */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-primary/5" />
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full border border-primary/15">
              <Users className="w-3.5 h-3.5" />
              Profesional verificado
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              {professional.name}
            </h1>

            {professional.profession && (
              <p className="mt-3 text-lg text-muted-foreground">{professional.profession}</p>
            )}

            {professional.description && (
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {professional.description}
              </p>
            )}

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-sm">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Atención flexible</p>
                    <p className="text-sm text-muted-foreground">Agenda online con horarios configurables</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-sm">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Reservas seguras</p>
                    <p className="text-sm text-muted-foreground">Notificaciones y control de estado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/register">
                <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition">
                  Reservar con CitaGest
                </span>
              </Link>
              <Link href="/login">
                <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold hover:bg-muted/30 transition">
                  Iniciar sesión
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CitaGest</p>
        </div>
      </footer>
    </div>
  )
}

