import { getCurrentProfessional } from "@/lib/auth"
import { getBookings, getServices, getClients } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Briefcase, Clock, DollarSign, Plus, ChevronRight } from "lucide-react"
import { format, startOfMonth, endOfMonth, isAfter, isBefore } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function DashboardPage() {
  const professional = await getCurrentProfessional()
  if (!professional) return null

  const [bookings, services, clients] = await Promise.all([
    getBookings(professional.id),
    getServices(professional.id),
    getClients(professional.id),
  ])

  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)

  const upcomingBookings = bookings.filter(
    (b) => b.status !== "cancelled" && isAfter(new Date(b.start_datetime), now)
  )
  
  const thisMonthBookings = bookings.filter(
    (b) => 
      b.status !== "cancelled" &&
      isAfter(new Date(b.start_datetime), monthStart) &&
      isBefore(new Date(b.start_datetime), monthEnd)
  )

  const confirmedRevenue = thisMonthBookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + (b.service_price || 0), 0)

  const pendingRevenue = thisMonthBookings
    .filter((b) => b.status === "pending")
    .reduce((sum, b) => sum + (b.service_price || 0), 0)

  const todayBookings = upcomingBookings.filter(
    (b) => format(new Date(b.start_datetime), "yyyy-MM-dd") === format(now, "yyyy-MM-dd")
  )

  const stats = [
    {
      title: "Citas Hoy",
      value: todayBookings.length,
      icon: Calendar,
      href: "/dashboard/bookings",
    },
    {
      title: "Próximas Citas",
      value: upcomingBookings.length,
      icon: Clock,
      href: "/dashboard/bookings",
    },
    {
      title: "Servicios",
      value: services.filter((s) => s.is_active).length,
      icon: Briefcase,
      href: "/dashboard/services",
    },
    {
      title: "Clientes",
      value: clients.length,
      icon: Users,
      href: "/dashboard/clients",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Hola, {professional.name.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground mt-1">
            {format(now, "EEEE, d 'de' MMMM", { locale: es })}
          </p>
        </div>
        <Link href="/dashboard/bookings/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nueva Reserva
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:border-primary/30 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Revenue Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ingresos del Mes
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              ${(confirmedRevenue / 100).toLocaleString("es-MX")} MXN
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {thisMonthBookings.length} reservas en {format(now, "MMMM", { locale: es })}
            </p>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendiente de Cobro
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              ${(pendingRevenue / 100).toLocaleString("es-MX")}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {thisMonthBookings.filter((b) => b.status === "pending").length} reservas pendientes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Citas de Hoy</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {todayBookings.length > 0 ? `${todayBookings.length} cita${todayBookings.length > 1 ? 's' : ''}` : 'Sin citas'}
            </p>
          </div>
          <Link href="/dashboard/bookings">
            <Button variant="ghost" size="sm" className="gap-1">
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {todayBookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No hay citas programadas para hoy</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayBookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[50px]">
                      <p className="text-lg font-bold text-foreground">
                        {format(new Date(booking.start_datetime), "HH:mm")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.service_duration || 60}m
                      </p>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div>
                      <p className="font-medium text-foreground">
                        {booking.client_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.service_name}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "pending"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {booking.status === "confirmed"
                      ? "Confirmada"
                      : booking.status === "pending"
                      ? "Pendiente"
                      : booking.status === "completed"
                      ? "Completada"
                      : "Cancelada"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/dashboard/services/new">
          <Card className="hover:border-primary/30 transition-colors cursor-pointer group">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Nuevo Servicio</p>
                <p className="text-sm text-muted-foreground">Agregar</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/clients/new">
          <Card className="hover:border-primary/30 transition-colors cursor-pointer group">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Nuevo Cliente</p>
                <p className="text-sm text-muted-foreground">Registrar</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/availability">
          <Card className="hover:border-primary/30 transition-colors cursor-pointer group">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Disponibilidad</p>
                <p className="text-sm text-muted-foreground">Editar</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}