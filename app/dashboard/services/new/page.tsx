import { ServiceForm } from "@/components/dashboard/service-form"

export default function NewServicePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Nuevo Servicio</h1>
        <p className="text-muted-foreground mt-1">
          Configura un nuevo servicio para ofrecer a tus clientes
        </p>
      </div>
      <ServiceForm />
    </div>
  )
}
