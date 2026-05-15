import { LoginForm } from '@/components/auth/login-form'
import { Calendar, ArrowLeft, Shield, Clock, Users } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Iniciar Sesión | CitaGest',
  description: 'Accede a tu panel de profesional',
}

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background">

      {/* Panel izquierdo — solo desktop */}
      <div className="hidden lg:flex w-[44%] shrink-0 flex-col bg-primary overflow-hidden relative">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute top-1/2 -right-20 w-56 h-56 rounded-full bg-violet-400/15 blur-2xl" />
          <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-indigo-900/50 blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative px-8 pt-7 pb-0 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="w-8 h-8 bg-white/15 rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-colors">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-white">CitaGest</span>
          </Link>
        </div>

        {/* Centro */}
        <div className="relative flex-1 flex flex-col justify-center px-8">
          <h2 className="text-2xl xl:text-3xl font-bold text-white leading-snug">
            Tu agenda profesional,<br />siempre bajo control
          </h2>
          <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-xs">
            Gestiona reservas, pagos y clientes desde un solo lugar.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { icon: Clock,  label: "Ahorra hasta 3 horas al día" },
              { icon: Users,  label: "+2,400 profesionales activos" },
              { icon: Shield, label: "Pagos cifrados y seguros" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  <Icon className="w-3.5 h-3.5 text-white/75" />
                </div>
                <p className="text-sm text-white/65">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative mx-6 mb-7 p-4 bg-white/8 rounded-xl border border-white/10">
          <p className="text-xs text-white/75 leading-relaxed italic">
            "Mis ausencias bajaron un 70%. Los pacientes lo usan solos."
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-7 h-7 rounded-full bg-violet-400 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-white">SR</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Dra. Sofía Ramírez</p>
              <p className="text-[10px] text-white/45">Psicóloga Clínica</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="shrink-0 flex items-center justify-between px-6 lg:px-8 py-4 border-b border-border/60">
          {/* Logo solo en móvil */}
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm text-foreground">CitaGest</span>
          </Link>
          <Link href="/" className="hidden lg:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Inicio
          </Link>
          <Link href="/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ¿Sin cuenta? <span className="text-primary font-semibold">Regístrate</span>
          </Link>
        </div>

        {/* Formulario centrado */}
        <div className="flex-1 flex items-center justify-center px-6 overflow-hidden">
          <div className="w-full max-w-[360px]">
            <h1 className="text-xl font-bold text-foreground tracking-tight">Bienvenido de vuelta</h1>
            <p className="mt-1 text-sm text-muted-foreground">Ingresa tus datos para continuar</p>
            <div className="h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent my-5" />
            <LoginForm />
            <p className="mt-4 text-center text-xs text-muted-foreground">
              <Link href="/forgot-password" className="text-primary/80 hover:text-primary hover:underline underline-offset-4">
                ¿Olvidaste tu contraseña?
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-3 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 CitaGest ·{' '}
            <Link href="/privacy" className="hover:underline underline-offset-4">Privacidad</Link>
            {' · '}
            <Link href="/terms" className="hover:underline underline-offset-4">Términos</Link>
          </p>
        </div>
      </div>
    </div>
  )
}