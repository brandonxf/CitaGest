import { getCurrentProfessional } from "@/lib/auth"
import { getServices } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, Edit2 } from "lucide-react"
import Link from "next/link"

export default async function ServicesPage() {
  const professional = await getCurrentProfessional()
  if (!professional) return null

  const services = await getServices(professional.id)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Servicios</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona los servicios que ofreces a tus clientes
          </p>
        </div>
        <Link href="/dashboard/services/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Servicio
          </Button>
        </Link>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              Aún no tienes servicios configurados
            </p>
            <Link href="/dashboard/services/new">
              <Button>Crear mi primer servicio</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent className="py-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {service.name}
                      </h3>
                      <Badge variant={service.is_active ? "default" : "secondary"}>
                        {service.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    {service.description && (
                      <p className="text-muted-foreground text-sm mb-3">
                        {service.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration_minutes} min
                      </span>
                      <span className="font-medium text-foreground">
                        ${(service.price_cents / 100).toLocaleString("es-MX")} {service.currency}
                      </span>
                    </div>
                  </div>
                  <Link href={`/dashboard/services/${service.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit2 className="h-4 w-4" />
                      Editar
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
