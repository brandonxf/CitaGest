import { redirect } from "next/navigation"
import { getCurrentProfessional } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const professional = await getCurrentProfessional()
  
  if (!professional) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardSidebar professional={professional} />
      <div className="lg:pl-64">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
