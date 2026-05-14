"use client"

import Link from "next/link"
import { Calendar, Clock, CreditCard, Users, ArrowRight, Check, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const features = [
  {
    icon: Calendar,
    title: "Agenda Inteligente",
    description: "Organiza tu disponibilidad semanal y recibe reservas automáticas sin esfuerzo.",
  },
  {
    icon: Clock,
    title: "Disponible 24/7",
    description: "Tus clientes reservan cuando quieran, desde cualquier dispositivo.",
  },
  {
    icon: CreditCard,
    title: "Pagos Simplificados",
    description: "Cobra tus servicios con Stripe. Transferencias directas a tu cuenta.",
  },
  {
    icon: Users,
    title: "Base de Clientes",
    description: "Historial completo de cada cliente para ofrecer un servicio personalizado.",
  },
]

const benefits = [
  "Página de reservas personalizada con tu marca",
  "Notificaciones automáticas por correo",
  "Panel de control con métricas en tiempo real",
  "Múltiples servicios con precios y duraciones configurables",
  "Bloqueo de fechas y vacaciones",
  "Sin límite de reservas",
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold tracking-tight">Brandito</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Características
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Precios
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Iniciar Sesión</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Crear Cuenta</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border mt-4 animate-slide-down">
              <nav className="flex flex-col gap-4">
                <a href="#features" className="text-sm text-muted-foreground">Características</a>
                <a href="#pricing" className="text-sm text-muted-foreground">Precios</a>
                <a href="#" className="text-sm text-muted-foreground">Docs</a>
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">Iniciar Sesión</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full">Crear Cuenta</Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-background">
        {/* Backdrop decorativo (colores sólidos) */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 w-[42rem] h-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
          <div className="absolute top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-accent/15 blur-3xl animate-blob-float" />
          <div className="absolute bottom-[-10rem] -right-24 w-[34rem] h-[34rem] rounded-full bg-secondary/40 blur-3xl animate-float-slow" />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-slide-up">
              <span className="relative inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-6 overflow-hidden">
                <span aria-hidden className="absolute inset-0 bg-primary/20 opacity-0" />
                <span aria-hidden className="absolute top-0 left-0 h-full w-1/2 bg-white/10" style={{ transform: 'translateX(-100%)', animation: 'shimmer 2.4s ease-in-out infinite' }} />
                Nuevo: Pagos con tarjeta
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight animate-slide-up delay-75">
              Tu agenda, bajo control
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up delay-150">
              Sistema de reservas para profesionales independientes. 
              Deja que tus clientes reserven mientras tú te dedicas a lo que mejor sabes hacer.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-225">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Comenzar Gratis
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Ver Demo
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted-foreground animate-slide-up delay-300">
              Sin tarjeta de crédito · Configuración en 3 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm text-center text-muted-foreground mb-8">
            Usado por profesionales de diversas áreas
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
            <span className="text-sm font-medium">Psicólogos</span>
            <span className="text-sm font-medium">Dentistas</span>
            <span className="text-sm font-medium">Coaches</span>
            <span className="text-sm font-medium">Fisioterapeutas</span>
            <span className="text-sm font-medium">Nutricionistas</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground animate-slide-up">
              Todo lo que necesitas
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto animate-slide-up delay-75">
              Herramientas simples pero poderosas para gestionar tu negocio
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors animate-slide-up relative overflow-hidden"
                style={{ animationDelay: `${150 + index * 75}ms` }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-primary/20 blur-2xl animate-float-slow" />
                  <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-accent/20 blur-2xl animate-float-slow" />
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground animate-slide-up">
                Menos administración, más atención
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed animate-slide-up delay-75">
                Automatiza las tareas repetitivas para dedicar tu tiempo a lo que realmente importa.
              </p>
              <ul className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={benefit} className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${150 + index * 75}ms` }}>
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="animate-slide-in-right delay-225">
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground">MG</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Dra. María García</p>
                    <p className="text-sm text-muted-foreground">Psicóloga Clínica</p>
                  </div>
                </div>
                
                <div className="py-6 space-y-4">
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
                
                <Button className="w-full">Reservar Cita</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground animate-slide-up">
              Simple y transparente
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto animate-slide-up delay-75">
              Sin sorpresas, sin comisiones ocultas. Elige el plan que mejor se adapte a ti.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free Plan */}
            <div className="p-6 bg-card rounded-xl border border-border animate-slide-up delay-150">
              <h3 className="text-lg font-semibold text-foreground">Gratis</h3>
              <p className="mt-2 text-sm text-muted-foreground">Para comenzar</p>
              <p className="mt-4 text-4xl font-bold text-foreground">$0</p>
              <p className="mt-1 text-sm text-muted-foreground">para siempre</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Hasta 20 reservas/mes
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  1 servicio
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Página de reservas básica
                </li>
              </ul>
              <Link href="/register" className="block mt-6">
                <Button variant="outline" className="w-full">Comenzar Gratis</Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="p-6 bg-card rounded-xl border-2 border-primary relative animate-slide-up delay-225">
              <span className="absolute -top-3 left-4 px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded">
                Popular
              </span>
              <h3 className="text-lg font-semibold text-foreground">Pro</h3>
              <p className="mt-2 text-sm text-muted-foreground">Para profesionales</p>
              <p className="mt-4 text-4xl font-bold text-foreground">$199</p>
              <p className="mt-1 text-sm text-muted-foreground">MXN/mes</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Reservas ilimitadas
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Servicios ilimitados
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Pagos con Stripe
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Estadísticas avanzadas
                </li>
              </ul>
              <Link href="/register" className="block mt-6">
                <Button className="w-full">Elegir Pro</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground animate-slide-up">
            Empieza hoy sin costo
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto animate-slide-up delay-75">
            Crea tu cuenta en minutos y comienza a recibir reservas. 
            Sin compromiso, sin tarjeta de crédito.
          </p>
          <Link href="/register" className="inline-block mt-8 animate-slide-up delay-150">
            <Button size="lg" variant="secondary" className="gap-2">
              Crear Mi Agenda
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Brandito</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Brandito. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacidad
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}