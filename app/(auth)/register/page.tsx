import { RegisterForm } from '@/components/auth/register-form'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Crear Cuenta | Brandito Reservas',
  description: 'Crea tu cuenta de profesional y comienza a recibir reservas',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground flex-col justify-between p-12">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">Brandito</span>
          </Link>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Comienza a recibir reservas en minutos
          </h1>
          <ul className="space-y-4 text-primary-foreground/90">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-medium">1</span>
              </div>
              <span>Crea tu perfil profesional</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-medium">2</span>
              </div>
              <span>Configura tus servicios y horarios</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-medium">3</span>
              </div>
              <span>Comparte tu link y recibe reservas</span>
            </li>
          </ul>
        </div>

        <p className="text-sm text-primary-foreground/60">
          Sin comisiones ocultas. Tu negocio, tus reglas.
        </p>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">Brandito</span>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Crea tu cuenta</h2>
            <p className="text-muted-foreground">
              Completa tus datos para empezar
            </p>
          </div>

          <RegisterForm />

          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
