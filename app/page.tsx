"use client"

import Link from "next/link"
import {
  Calendar, Clock, CreditCard, Users, ArrowRight, Check,
  Menu, X, Star, ChevronRight, Zap, Shield, BarChart3, Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const features = [
  {
    icon: Calendar,
    title: "Agenda Inteligente",
    description: "Organiza tu disponibilidad semanal y recibe reservas automáticas. Sin conflictos, sin doble booking.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Clock,
    title: "Disponible 24/7",
    description: "Tus clientes reservan cuando quieran, desde cualquier dispositivo, sin que intervengas.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: CreditCard,
    title: "Pagos Integrados",
    description: "Cobra en el momento de la reserva. Transferencias automáticas directamente a tu cuenta bancaria.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Users,
    title: "CRM de Clientes",
    description: "Historial completo, notas y preferencias de cada cliente para ofrecer un servicio excepcional.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Bell,
    title: "Recordatorios",
    description: "Notificaciones automáticas por correo y SMS que reducen las ausencias hasta en un 80%.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: BarChart3,
    title: "Analítica en Tiempo Real",
    description: "Métricas de ocupación, ingresos y tendencias para tomar decisiones basadas en datos reales.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
]

const testimonials = [
  {
    name: "Dra. Sofía Ramírez",
    role: "Psicóloga Clínica",
    avatar: "SR",
    color: "bg-indigo-500",
    text: "Desde que uso CitaGest mis ausencias bajaron un 70%. El sistema es tan intuitivo que mis pacientes lo usan sin ayuda.",
  },
  {
    name: "Carlos Mendoza",
    role: "Fisioterapeuta",
    avatar: "CM",
    color: "bg-violet-500",
    text: "Recuperé 3 horas diarias que antes perdía en llamadas para agendar. Ahora las dedico a mis pacientes.",
  },
  {
    name: "Lic. Ana Torres",
    role: "Nutricionista",
    avatar: "AT",
    color: "bg-amber-500",
    text: "La integración de pagos fue un cambio radical. Cero cancelaciones de último momento desde que cobro al reservar.",
  },
]

const benefits = [
  "Página de reservas con tu marca y dominio propio",
  "Notificaciones automáticas por correo y SMS",
  "Panel de analítica con métricas en tiempo real",
  "Múltiples servicios con precios y duraciones",
  "Bloqueo de fechas, vacaciones y horarios especiales",
  "Sin límite de reservas ni clientes",
  "Integración con Google Calendar y Outlook",
  "Soporte prioritario por WhatsApp",
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ── HEADER ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
                <Calendar className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">CitaGest</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {[
                { href: "#features", label: "Características" },
                { href: "#testimonials", label: "Testimonios" },
                { href: "#pricing", label: "Precios" },
              ].map(({ href, label }) => (
                <a key={href} href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                  {label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-medium">Iniciar sesión</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="gap-1.5 shadow-sm shadow-primary/25 hover:shadow-primary/40 transition-shadow font-medium">
                  Empezar gratis
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            <button className="md:hidden p-2 -mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-5 border-t border-border mt-4 animate-slide-down">
              <nav className="flex flex-col gap-4">
                {[["#features","Características"],["#testimonials","Testimonios"],["#pricing","Precios"]].map(([href,label]) => (
                  <a key={href} href={href} className="text-sm text-muted-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>{label}</a>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <Link href="/login"><Button variant="outline" className="w-full">Iniciar sesión</Button></Link>
                  <Link href="/register"><Button className="w-full">Empezar gratis</Button></Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        {/* Fondo decorativo */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[56rem] h-[56rem] rounded-full bg-primary/8 blur-3xl animate-blob-float" />
          <div className="absolute top-1/3 -left-32 w-[30rem] h-[30rem] rounded-full bg-violet-400/10 blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 -right-24 w-[36rem] h-[36rem] rounded-full bg-amber-400/8 blur-3xl animate-float-slow" style={{animationDelay:"3s"}} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">

            <div className="animate-slide-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold bg-primary/8 text-primary rounded-full border border-primary/15 mb-8">
                <Zap className="w-3 h-3" />
                Nuevo: Recordatorios por WhatsApp
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] animate-slide-up delay-75">
              Gestiona tus citas{" "}
              <span className="relative inline-block">
                <span className="text-primary">sin esfuerzo</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 280 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 9C46.5 3.5 140 1 278 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/40" />
                </svg>
              </span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up delay-150">
              La plataforma de reservas para profesionales independientes que automatiza tu agenda, reduce ausencias y simplifica los pagos.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-225">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto gap-2 h-12 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                  Comenzar gratis
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                  Ver demo en vivo
                </Button>
              </Link>
            </div>

            <p className="mt-5 text-sm text-muted-foreground animate-slide-up delay-300">
              Sin tarjeta de crédito · Configuración en menos de 5 minutos
            </p>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto animate-slide-up delay-375">
              {[["2,400+","Profesionales"],["98%","Satisfacción"],["80%","Menos ausencias"]].map(([val,label]) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold text-foreground">{val}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROFESIONES ─────────────────────────────────────── */}
      <div className="border-y border-border/60 bg-muted/20 py-5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 opacity-50">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(79,70,229,0.15)]" aria-hidden />
              Usado por
            </p>

            {["Psicólogos","Dentistas","Coaches","Fisioterapeutas","Nutricionistas","Dermatólogos","Abogados"].map((p) => (
              <Link
                key={p}
                href="/pro"
                className="relative inline-flex items-center justify-center text-sm font-semibold text-foreground/80 px-3 py-1 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all shadow-sm hover:shadow-primary/10"
              >
                {p}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section id="features" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Características</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground animate-slide-up">
              Todo lo que necesitas,<br className="hidden sm:block" /> nada que no necesites
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto animate-slide-up delay-75">
              Herramientas potentes diseñadas para profesionales que valoran su tiempo
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group relative p-7 bg-card rounded-2xl border border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-slide-up overflow-hidden"
                style={{ animationDelay: `${100 + i * 60}ms` }}
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:to-violet-500/3 transition-all duration-500 rounded-2xl" />
                <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center mb-5`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-[15px]">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Saber más <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS / MOCKUP ───────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-muted/25">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Por qué CitaGest</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Menos administración,<br /> más tiempo para lo que importa
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Automatiza cada paso del proceso de reserva — desde la confirmación hasta el cobro — para que puedas enfocarte en tus clientes.
              </p>
              <ul className="mt-8 space-y-3.5">
                {benefits.map((b, i) => (
                  <li key={b} className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${100 + i * 50}ms` }}>
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex gap-4">
                <Link href="/register">
                  <Button className="gap-2 shadow-sm shadow-primary/25">
                    Empezar ahora <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mockup de panel */}
            <div className="animate-slide-in-right delay-150">
              <div className="relative bg-card rounded-2xl border border-border shadow-2xl shadow-foreground/8 overflow-hidden">
                {/* Barra de título */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-muted/30">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs text-muted-foreground font-medium">Panel de reservas — Dra. María García</span>
                </div>

                <div className="p-6 space-y-4">
                  {/* Próximas citas */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Hoy — 4 citas</p>
                    <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-medium border border-emerald-100">Todas confirmadas</span>
                  </div>

                  {[
                    { time: "09:00", name: "Luis Herrera", service: "Sesión Individual", color: "bg-indigo-500", paid: true },
                    { time: "10:30", name: "Carmen López", service: "Primera Consulta", color: "bg-violet-500", paid: true },
                    { time: "12:00", name: "Javier Ruiz", service: "Sesión de Pareja", color: "bg-amber-500", paid: false },
                    { time: "16:00", name: "Patricia Vega", service: "Sesión Individual", color: "bg-emerald-500", paid: true },
                  ].map((apt) => (
                    <div key={apt.time} className="flex items-center gap-3 p-3.5 bg-muted/30 rounded-xl border border-border/60">
                      <div className="text-right w-10 shrink-0">
                        <p className="text-xs font-bold text-foreground">{apt.time}</p>
                      </div>
                      <div className={`w-0.5 h-8 ${apt.color} rounded-full shrink-0 opacity-70`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{apt.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{apt.service}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${apt.paid ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"}`}>
                        {apt.paid ? "Pagado" : "Pendiente"}
                      </span>
                    </div>
                  ))}

                  {/* Ingresos del día */}
                  <div className="mt-2 flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <div>
                      <p className="text-xs text-muted-foreground">Ingresos hoy</p>
                      <p className="text-2xl font-bold text-foreground mt-0.5">$3,400 <span className="text-sm font-medium text-muted-foreground">MXN</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-emerald-600 font-semibold">↑ 12% vs ayer</p>
                      <p className="text-xs text-muted-foreground mt-0.5">3 de 4 cobrados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ─────────────────────────────────────── */}
      <section id="testimonials" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Testimonios</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground animate-slide-up">
              Lo que dicen nuestros usuarios
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className="p-7 bg-card rounded-2xl border border-border hover:shadow-lg hover:shadow-foreground/5 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${100 + i * 80}ms` }}>
                <div className="flex gap-1 mb-5">
                  {Array.from({length:5}).map((_,j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 ${t.color} rounded-full flex items-center justify-center`}>
                    <span className="text-xs font-bold text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────── */}
      <section id="pricing" className="py-24 lg:py-32 bg-muted/25">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Planes</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground animate-slide-up">
              Precios simples y transparentes
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto animate-slide-up delay-75">
              Sin sorpresas ni comisiones ocultas. Escala cuando estés listo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <div className="p-8 bg-card rounded-2xl border border-border animate-slide-up delay-150">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground">Starter</h3>
                <p className="text-sm text-muted-foreground mt-1">Para comenzar sin riesgo</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">$0</span>
                  <span className="text-sm text-muted-foreground">/ para siempre</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {["Hasta 20 reservas / mes", "1 servicio configurable", "Página de reservas básica", "Notificaciones por correo"].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button variant="outline" className="w-full font-medium">Comenzar gratis</Button>
              </Link>
            </div>

            {/* Pro */}
            <div className="relative p-8 bg-primary rounded-2xl border-2 border-primary animate-slide-up delay-225 shadow-2xl shadow-primary/25">
              <span className="absolute -top-3.5 left-6 px-3 py-1 text-xs font-bold bg-amber-400 text-amber-900 rounded-full shadow-sm">
                Más popular
              </span>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-foreground">Pro</h3>
                <p className="text-sm text-primary-foreground/70 mt-1">Para profesionales serios</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-primary-foreground">$199</span>
                  <span className="text-sm text-primary-foreground/70">MXN / mes</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Reservas y clientes ilimitados",
                  "Servicios ilimitados",
                  "Pagos con Stripe integrado",
                  "Recordatorios SMS y WhatsApp",
                  "Analítica avanzada",
                  "Dominio personalizado",
                  "Soporte prioritario",
                ].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-primary-foreground">
                    <Check className="w-4 h-4 text-primary-foreground/80 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button variant="secondary" className="w-full font-semibold">Elegir Pro</Button>
              </Link>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            <Shield className="w-3.5 h-3.5 inline mr-1.5 text-primary" />
            Garantía de devolución de 14 días si no estás satisfecho
          </p>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[44rem] h-[44rem] rounded-full bg-primary/8 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground animate-slide-up leading-tight">
            Empieza hoy.<br />
            <span className="text-primary">Tu agenda te lo agradecerá.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground animate-slide-up delay-75">
            Únete a más de 2,400 profesionales que ya gestionan sus citas con CitaGest.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-150">
            <Link href="/register">
              <Button size="lg" className="gap-2 h-12 px-8 text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all">
                Crear mi cuenta gratis
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground animate-slide-up delay-225">
            Sin tarjeta · Cancela cuando quieras
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">CitaGest</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 CitaGest. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacidad</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Términos</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}