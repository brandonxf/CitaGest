import { getCurrentProfessional } from "@/lib/auth"
import { getAvailability, getTimeBlocks } from "@/lib/db"
import { AvailabilityManager } from "@/components/dashboard/availability-manager"

export default async function AvailabilityPage() {
  const professional = await getCurrentProfessional()
  if (!professional) return null

  const [availability, timeBlocks] = await Promise.all([
    getAvailability(professional.id),
    getTimeBlocks(professional.id),
  ])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Disponibilidad</h1>
        <p className="text-muted-foreground mt-1">
          Configura tus horarios de atención semanales
        </p>
      </div>
      <AvailabilityManager 
        availability={availability} 
        timeBlocks={timeBlocks}
      />
    </div>
  )
}
