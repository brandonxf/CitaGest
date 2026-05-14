import { getCurrentProfessional } from "@/lib/auth"
import { getBookings, getServices, getClients } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Briefcase, TrendingUp } from "lucide-react"
import { format, startOfMonth, endOfMonth, isAfter, isBefore, addDays } from "date-fns"
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
      icon: TrendingUp,
      href: "/dashboard/bookings",
    },
    {
      title: "Servicios Activos",
      value: services.filter((s) => s.is_active).length,
      icon: Briefcase,
      href: "/dashboard/services",
    },
    {
      title: "Total Clientes",
      value: clients.length,
      icon: Users,
      href: "/dashboard/clients",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Bienvenido, {professional.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground mt-1">
          {format(now, "EEEE, d 'de' MMMM", { locale: es })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
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

      {/* Revenue Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Ingresos del Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-foreground">
            ${(confirmedRevenue / 100).toLocaleString("es-MX")} MXN
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {thisMonthBookings.length} reservas en {format(now, "MMMM", { locale: es })}
          </p>
        </CardContent>
      </Card>

      {/* Today's Appointments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Citas de Hoy</CardTitle>
          <Link href="/dashboard/bookings">
            <Button variant="outline" size="sm">
              Ver todas
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {todayBookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No tienes citas programadas para hoy
            </p>
          ) : (
            <div className="space-y-4">
              {todayBookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">
                        {format(new Date(booking.start_datetime), "HH:mm")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.service_duration || 60} min
                      </p>
                    </div>
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
    </div>
  )
}
