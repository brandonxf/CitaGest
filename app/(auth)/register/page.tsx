import { RegisterForm } from '@/components/auth/register-form'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Crear Cuenta | Brandito',
  description: 'Crea tu cuenta de profesional y comienza a recibir reservas',
}

export default function RegisterPage() {
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
        <div className="w-full max-w-sm">
          {/* Form Card */}
          <div className="bg-card rounded-xl border border-border p-8 shadow-sm animate-scale-in">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground">Crea tu cuenta</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Completa tus datos para comenzar
              </p>
            </div>

            <RegisterForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Al registrarte, aceptas nuestros{' '}
            <Link href="/terms" className="text-primary hover:underline">Términos de Servicio</Link>
            {' '}y{' '}
            <Link href="/privacy" className="text-primary hover:underline">Política de Privacidad</Link>
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