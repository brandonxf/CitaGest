import { LoginForm } from '@/components/auth/login-form'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Iniciar Sesión | Brandito',
  description: 'Accede a tu panel de profesional',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Brandito</span>
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <div className="bg-card rounded-2xl border border-border p-10 shadow-sm animate-scale-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Bienvenido</h1>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground">Ingresa tus datos para continuar
              </p>
            </div>

            <LoginForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿No tienes cuenta?{' '}
                <Link href="/register" className="font-medium text-primary hover:underline">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>

          {/* Help text */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            ¿Olvidaste tu contraseña?{' '}
            <Link href="/forgot-password" className="text-primary hover:underline">
              Recupérala aquí
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-xs text-muted-foreground">
          © 2024 Brandito ·{' '}
          <Link href="/privacy" className="hover:underline">Privacidad</Link>
          {' · '}
          <Link href="/terms" className="hover:underline">Términos</Link>
        </p>
      </footer>
    </div>
  )
}