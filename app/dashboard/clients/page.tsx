import { getCurrentProfessional } from "@/lib/auth"
import { getClients, getBookings } from "@/lib/db"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Mail, Phone, Calendar } from "lucide-react"

export default async function ClientsPage() {
  const professional = await getCurrentProfessional()
  if (!professional) return null

  const [clients, bookings] = await Promise.all([
    getClients(professional.id),
    getBookings(professional.id),
  ])

  // Calculate stats per client
  const clientStats = clients.map((client) => {
    const clientBookings = bookings.filter((b) => b.client_id === client.id)
    const completedBookings = clientBookings.filter((b) => b.status === "completed")
    const totalSpent = completedBookings.reduce((sum, b) => sum + (b.service_price || 0), 0)
    const lastBooking = clientBookings[0]
    
    return {
      ...client,
      totalBookings: clientBookings.length,
      completedBookings: completedBookings.length,
      totalSpent,
      lastBooking,
    }
  })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
        <p className="text-muted-foreground mt-1">
          {clients.length} clientes registrados
        </p>
      </div>

      {clients.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Aún no tienes clientes registrados. Aparecerán aquí cuando recibas tu primera reserva.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {clientStats.map((client) => (
            <Card key={client.id}>
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">
                      {client.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {client.email}
                      </span>
                      {client.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          {client.phone}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                      <span className="text-muted-foreground">
                        <span className="font-medium text-foreground">{client.completedBookings}</span> citas completadas
                      </span>
                      <span className="text-muted-foreground">
                        <span className="font-medium text-foreground">
                          ${(client.totalSpent / 100).toLocaleString("es-MX")}
                        </span> MXN total
                      </span>
                      {client.lastBooking && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          Última cita: {format(new Date(client.lastBooking.start_datetime), "d MMM yyyy", { locale: es })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
