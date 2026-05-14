import { getCurrentProfessional } from "@/lib/auth"
import { ProfileSettings } from "@/components/dashboard/profile-settings"

export default async function SettingsPage() {
  const professional = await getCurrentProfessional()
  if (!professional) return null

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground mt-1">
          Personaliza tu perfil y página de reservas
        </p>
      </div>
      <ProfileSettings professional={professional} />
    </div>
  )
}
