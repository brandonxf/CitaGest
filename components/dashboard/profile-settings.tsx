"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateProfile } from "@/app/actions/profile"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface Professional {
  id: string
  name: string
  email: string
  slug: string
  profession: string | null
  description: string | null
  phone: string | null
}

interface ProfileSettingsProps {
  professional: Professional
}

export function ProfileSettings({ professional }: ProfileSettingsProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)
    
    try {
      await updateProfile(formData)
      setMessage("Perfil actualizado correctamente")
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Error al actualizar el perfil")
    } finally {
      setLoading(false)
    }
  }

  const publicUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/${professional.slug}`
    : `/${professional.slug}`

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-3 rounded-lg text-sm ${
          message.includes("Error") 
            ? "bg-destructive/10 text-destructive" 
            : "bg-primary/10 text-primary"
        }`}>
          {message}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tu Página Pública</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">URL de tu página</p>
              <p className="font-medium text-foreground truncate">
                {publicUrl}
              </p>
            </div>
            <Link href={`/${professional.slug}`} target="_blank">
              <Button variant="outline" size="sm" className="gap-2 shrink-0">
                <ExternalLink className="h-4 w-4" />
                Ver página
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información del Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                name="name"
                defaultValue={professional.name}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profession">Profesión</Label>
              <Input
                id="profession"
                name="profession"
                placeholder="Ej: Psicóloga Clínica"
                defaultValue={professional.profession || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono (opcional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+52 55 1234 5678"
                defaultValue={professional.phone || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Cuéntale a tus clientes sobre ti y tu práctica..."
                rows={4}
                defaultValue={professional.description || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL personalizada</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">/</span>
                <Input
                  id="slug"
                  name="slug"
                  defaultValue={professional.slug}
                  pattern="[a-z0-9-]+"
                  title="Solo letras minúsculas, números y guiones"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Solo letras minúsculas, números y guiones
              </p>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
