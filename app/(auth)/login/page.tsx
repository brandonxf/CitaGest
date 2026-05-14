import { LoginForm } from '@/components/auth/login-form'
import { Calendar, ArrowLeft, Shield, Clock, Users } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Iniciar Sesión | CitaGest',
  description: 'Accede a tu panel de profesional',
}

export default function LoginPage() {
  return (
    <div className="h-screen flex overflow-hidden">

      {/* ── Panel izquierdo — solo desktop ── */}
      <div className="hidden lg:flex lg:w-[44%] relative flex-col bg-primary overflow-hidden shrink-0">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute top-1/3 -right-16 w-64 h-64 rounded-full bg-violet-400/15 blur-2xl" />
          <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full bg-indigo-800/40 blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative p-8">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="w-9 h-9 bg-white/15 backdrop-blur rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">CitaGest</span>
          </Link>
        </div>

        {/* Contenido */}
        <div className="relative flex-1 flex flex-col justify-center px-10 pb-6">
          <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight">
            Tu agenda profesional,<br />siempre bajo control
          </h2>
          <p className="mt-4 text-sm text-white/65 leading-relaxed max-w-sm">
            Gestiona reservas, pagos y clientes desde un solo lugar, disponible las 24 horas.
          </p>

          <div className="mt-8 space-y-3.5">
            {[
              { icon: Clock, label: "Ahorra hasta 3 horas al día en coordinación" },
              { icon: Users, label: "Más de 2,400 profesionales confían en CitaGest" },
              { icon: Shield, label: "Pagos seguros con cifrado de extremo a extremo" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  <Icon className="w-4 h-4 text-white/80" />
                </div>
                <p className="text-sm text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="relative m-8 mt-0 p-5 bg-white/8 rounded-2xl border border-white/10 backdrop-blur-sm">
          <p className="text-sm text-white/80 leading-relaxed italic">
            "CitaGest redujo mis ausencias en un 70%. Mis pacientes lo usan solos, sin instrucciones."
          </p>
          <div className="flex items-center gap-2.5 mt-3">
            <div className="w-8 h-8 rounded-full bg-violet-400 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">SR</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Dra. Sofía Ramírez</p>
              <p className="text-xs text-white/50">Psicóloga Clínica</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Panel derecho (formulario) ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header móvil */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">CitaGest</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Inicio
          </Link>
        </div>

        {/* Enlace volver — desktop */}
        <div className="hidden lg:flex px-8 pt-6 shrink-0">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al inicio
          </Link>
        </div>

        {/* Formulario */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Bienvenido de vuelta</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">Ingresa tus datos para acceder a tu panel</p>
            </div>

            <div className="h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent mb-7 rounded-full" />

            <LoginForm />

            <div className="mt-5 text-center">
              <p className="text-sm text-muted-foreground">
                ¿No tienes cuenta?{' '}
                <Link href="/register" className="font-semibold text-primary hover:underline underline-offset-4">
                  Regístrate gratis
                </Link>
              </p>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              <Link href="/forgot-password" className="text-primary/80 hover:text-primary hover:underline underline-offset-4">
                ¿Olvidaste tu contraseña?
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border/50 text-center shrink-0">
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