"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2 } from "lucide-react"
import { saveAvailability } from "@/app/actions/availability"
import type { Availability, TimeBlock } from "@/lib/db"

const DAYS = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
]

interface AvailabilityManagerProps {
  availability: Availability[]
  timeBlocks: TimeBlock[]
}

type DaySchedule = {
  isActive: boolean
  slots: { start: string; end: string }[]
}

export function AvailabilityManager({ availability }: AvailabilityManagerProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Initialize schedule from availability data
  const initialSchedule: Record<number, DaySchedule> = {}
  DAYS.forEach((day) => {
    const daySlots = availability.filter((a) => a.day_of_week === day.value)
    initialSchedule[day.value] = {
      isActive: daySlots.length > 0 && daySlots.some((s) => s.is_active),
      slots:
        daySlots.length > 0
          ? daySlots.map((s) => ({ start: s.start_time.slice(0, 5), end: s.end_time.slice(0, 5) }))
          : [{ start: "09:00", end: "17:00" }],
    }
  })

  const [schedule, setSchedule] = useState(initialSchedule)

  function toggleDay(day: number) {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isActive: !prev[day].isActive,
      },
    }))
  }

  function updateSlot(day: number, index: number, field: "start" | "end", value: string) {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, i) =>
          i === index ? { ...slot, [field]: value } : slot
        ),
      },
    }))
  }

  function addSlot(day: number) {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { start: "14:00", end: "18:00" }],
      },
    }))
  }

  function removeSlot(day: number, index: number) {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index),
      },
    }))
  }

  async function handleSave() {
    setLoading(true)
    setMessage("")
    
    try {
      const data = Object.entries(schedule).flatMap(([day, config]) =>
        config.isActive
          ? config.slots.map((slot) => ({
              day_of_week: parseInt(day),
              start_time: slot.start,
              end_time: slot.end,
              is_active: true,
            }))
          : []
      )
      
      await saveAvailability(data)
      setMessage("Disponibilidad guardada correctamente")
    } catch {
      setMessage("Error al guardar la disponibilidad")
    } finally {
      setLoading(false)
    }
  }

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
          <CardTitle className="text-lg">Horarios Semanales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {DAYS.map((day) => (
            <div key={day.value} className="border-b border-border pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={schedule[day.value].isActive}
                    onCheckedChange={() => toggleDay(day.value)}
                  />
                  <Label className="font-medium">{day.label}</Label>
                </div>
                {schedule[day.value].isActive && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addSlot(day.value)}
                    className="gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Añadir horario
                  </Button>
                )}
              </div>

              {schedule[day.value].isActive && (
                <div className="space-y-3 pl-11">
                  {schedule[day.value].slots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={slot.start}
                          onChange={(e) => updateSlot(day.value, index, "start", e.target.value)}
                          className="w-32"
                        />
                        <span className="text-muted-foreground">a</span>
                        <Input
                          type="time"
                          value={slot.end}
                          onChange={(e) => updateSlot(day.value, index, "end", e.target.value)}
                          className="w-32"
                        />
                      </div>
                      {schedule[day.value].slots.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSlot(day.value, index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Guardando..." : "Guardar Disponibilidad"}
        </Button>
      </div>
    </div>
  )
}
