"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  Users, 
  Settings,
  ExternalLink,
  LogOut,
  Briefcase,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { logoutAction } from "@/app/actions/auth"

interface Professional {
  id: string
  name: string
  email: string
  slug: string
  profession: string | null
}

interface DashboardSidebarProps {
  professional: Professional
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Reservas", href: "/dashboard/bookings", icon: Calendar },
  { name: "Servicios", href: "/dashboard/services", icon: Briefcase },
  { name: "Disponibilidad", href: "/dashboard/availability", icon: Clock },
  { name: "Clientes", href: "/dashboard/clients", icon: Users },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
]

function SidebarContent({ professional }: DashboardSidebarProps) {
  const pathname = usePathname()
  
  const handleLogout = async () => {
    await logoutAction()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <Link href="/dashboard" className="text-xl font-semibold tracking-tight text-foreground">
          CitaGest
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/dashboard" && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Public Page Link */}
      <div className="px-3 py-2">
        <Link
          href={`/${professional.slug}`}
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-5 w-5" />
          Ver mi página
        </Link>
      </div>

      {/* User */}
      <div className="px-3 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              {professional.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {professional.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {professional.profession || professional.email}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}

export function DashboardSidebar({ professional }: DashboardSidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="text-xl font-semibold tracking-tight">
            CitaGest
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <SidebarContent professional={professional} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="lg:hidden h-14" />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 bg-card border-r border-border">
          <SidebarContent professional={professional} />
        </div>
      </aside>
    </>
  )
}