import { getCurrentProfessional } from "@/lib/auth"
import { getBookings } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, isAfter, isBefore, startOfToday } from "date-fns"
import { es } from "date-fns/locale"
import { BookingActions } from "@/components/dashboard/booking-actions"

const statusLabels = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
}

const statusVariants = {
  pending: "secondary",
  confirmed: "default",
  completed: "outline",
  cancelled: "destructive",
} as const

export default async function BookingsPage() {
  const professional = await getCurrentProfessional()
  if (!professional) return null

  const bookings = await getBookings(professional.id)
  const today = startOfToday()

  const upcomingBookings = bookings.filter(
    (b) => b.status !== "cancelled" && isAfter(new Date(b.start_datetime), today)
  )
  const pastBookings = bookings.filter(
    (b) => isBefore(new Date(b.start_datetime), today) || b.status === "cancelled"
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Reservas</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona las citas de tus clientes
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">
            Próximas ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Historial ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No tienes reservas próximas
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="py-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="text-center min-w-[60px]">
                          <p className="text-2xl font-bold text-foreground">
                            {format(new Date(booking.start_datetime), "d")}
                          </p>
                          <p className="text-sm text-muted-foreground uppercase">
                            {format(new Date(booking.start_datetime), "MMM", { locale: es })}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground">
                              {booking.client_name}
                            </p>
                            <Badge variant={statusVariants[booking.status]}>
                              {statusLabels[booking.status]}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {booking.service_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(booking.start_datetime), "EEEE, HH:mm", { locale: es })} - {" "}
                            {format(new Date(booking.end_datetime), "HH:mm")}
                          </p>
                          <p className="text-sm font-medium text-foreground mt-1">
                            ${(booking.service_price / 100).toLocaleString("es-MX")} MXN
                          </p>
                        </div>
                      </div>
                      <BookingActions booking={booking} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No tienes reservas pasadas
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <Card key={booking.id} className="opacity-75">
                  <CardContent className="py-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="text-center min-w-[60px]">
                          <p className="text-2xl font-bold text-foreground">
                            {format(new Date(booking.start_datetime), "d")}
                          </p>
                          <p className="text-sm text-muted-foreground uppercase">
                            {format(new Date(booking.start_datetime), "MMM", { locale: es })}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground">
                              {booking.client_name}
                            </p>
                            <Badge variant={statusVariants[booking.status]}>
                              {statusLabels[booking.status]}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {booking.service_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(booking.start_datetime), "EEEE d, HH:mm", { locale: es })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
