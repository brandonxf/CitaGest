"use client"

import Link from "next/link"
import { Calendar, Clock, CreditCard, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Calendar,
    title: "Calendario Inteligente",
    description: "Gestiona tu disponibilidad semanal y bloquea fechas específicas fácilmente.",
  },
  {
    icon: Clock,
    title: "Reservas 24/7",
    description: "Tus clientes pueden reservar en cualquier momento, sin llamadas ni esperas.",
  },
  {
    icon: CreditCard,
    title: "Pagos Integrados",
    description: "Cobra automáticamente con Stripe. Sin complicaciones, sin demoras.",
  },
  {
    icon: Users,
    title: "Gestión de Clientes",
    description: "Historial completo de cada cliente y sus reservas anteriores.",
  },
]

const benefits = [
  "Página de reservas personalizada con tu URL única",
  "Confirmaciones automáticas por email",
  "Dashboard con estadísticas en tiempo real",
  "Múltiples servicios con diferentes precios y duraciones",
  "Bloqueo de horarios y vacaciones",
  "Sin límite de reservas mensuales",
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Brandito
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button>Crear Cuenta</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
            Tu agenda profesional,
            <br />
            <span className="text-muted-foreground">simplificada</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Sistema de reservas online para psicólogos, coaches, dentistas y profesionales independientes. 
            Deja que tus clientes reserven mientras tú te enfocas en lo importante.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Comenzar Gratis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg">
                Ver Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Todo lo que necesitas
            </h2>
            <p className="mt-4 text-muted-foreground">
              Herramientas diseñadas para profesionales independientes
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                Enfócate en tus clientes, no en la administración
              </h2>
              <p className="text-muted-foreground mb-8">
                Automatiza las tareas repetitivas y dedica tu tiempo a lo que realmente importa: 
                ofrecer un servicio excepcional.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 border border-border">
              <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">DR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Dra. María García</p>
                    <p className="text-sm text-muted-foreground">Psicóloga Clínica</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-foreground">Sesión Individual</span>
                    <span className="text-sm font-medium text-foreground">$800 MXN</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-foreground">Sesión de Pareja</span>
                    <span className="text-sm font-medium text-foreground">$1,200 MXN</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-foreground">Primera Consulta</span>
                    <span className="text-sm font-medium text-foreground">$600 MXN</span>
                  </div>
                </div>
                <Button className="w-full mt-6">Reservar Cita</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Comienza hoy mismo
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Crea tu cuenta gratis y configura tu página de reservas en minutos. 
            Sin tarjeta de crédito requerida.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="gap-2">
              Crear mi página de reservas
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              2024 Brandito. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacidad
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
