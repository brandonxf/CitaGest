import { LoginForm } from '@/components/auth/login-form'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Iniciar Sesión | Brandito Reservas',
  description: 'Accede a tu panel de profesional',
}

export default function LoginPage() {
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
            Gestiona tus citas de forma profesional
          </h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Automatiza tus reservas, recibe pagos en línea y enfócate en lo que mejor haces: 
            atender a tus clientes.
          </p>
        </div>

        <p className="text-sm text-primary-foreground/60">
          Plataforma de reservas para profesionales independientes
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
            <h2 className="text-3xl font-bold tracking-tight">Bienvenido de nuevo</h2>
            <p className="text-muted-foreground">
              Ingresa tus credenciales para acceder a tu panel
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
