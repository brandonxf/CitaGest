"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createService, updateService, deleteService } from "@/app/actions/services"
import type { Service } from "@/lib/db"

interface ServiceFormProps {
  service?: Service
}

const durations = [15, 30, 45, 60, 90, 120]

export function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    
    try {
      if (service) {
        await updateService(service.id, formData)
      } else {
        await createService(formData)
      }
      router.push("/dashboard/services")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar el servicio")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!service) return
    if (!confirm("¿Estás seguro de eliminar este servicio?")) return
    
    setLoading(true)
    try {
      await deleteService(service.id)
      router.push("/dashboard/services")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar el servicio")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nombre del servicio</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ej: Sesión de terapia individual"
              defaultValue={service?.name || ""}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe brevemente el servicio..."
              defaultValue={service?.description || ""}
              rows={3}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duración</Label>
              <Select name="duration" defaultValue={String(service?.duration_minutes || 60)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona duración" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((d) => (
                    <SelectItem key={d} value={String(d)}>
                      {d} minutos
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio (MXN)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="800"
                defaultValue={service ? service.price_cents / 100 : ""}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              defaultChecked={service?.is_active ?? true}
              className="h-4 w-4 rounded border-input"
            />
            <Label htmlFor="is_active" className="text-sm font-normal">
              Servicio activo (visible para clientes)
            </Label>
          </div>

          <div className="flex items-center justify-between pt-4">
            {service && (
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleDelete}
                disabled={loading}
              >
                Eliminar
              </Button>
            )}
            <div className="flex items-center gap-3 ml-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : service ? "Guardar Cambios" : "Crear Servicio"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
