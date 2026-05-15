"use client"

import { useState, useMemo } from "react"
import { format, addDays, startOfDay, isBefore, isToday, addMinutes, parseISO, getDay } from "date-fns"
import { es } from "date-fns/locale"
import { createBooking } from "@/app/actions/bookings"
import type { Professional, Service, Availability } from "@/lib/db"
import {
  Clock, ChevronLeft, ChevronRight, CheckCircle2,
  User, Mail, Phone, FileText, Loader2, Calendar, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DAYS_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const DAYS_FULL = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

function generateSlots(
  date: Date,
  availability: Availability[],
  durationMinutes: number
): string[] {
  const dayOfWeek = getDay(date)
  const dayAvail = availability.filter(a => a.is_active && a.day_of_week === dayOfWeek)
  if (!dayAvail.length) return []

  const slots: string[] = []
  const dateStr = format(date, "yyyy-MM-dd")

  for (const avail of dayAvail) {
    const [sh, sm] = avail.start_time.split(":").map(Number)
    const [eh, em] = avail.end_time.split(":").map(Number)
    let current = sh * 60 + sm
    const endMins = eh * 60 + em

    while (current + durationMinutes <= endMins) {
      const h = Math.floor(current / 60).toString().padStart(2, "0")
      const m = (current % 60).toString().padStart(2, "0")
      const slotStart = new Date(`${dateStr}T${h}:${m}:00`)
      if (!isBefore(slotStart, new Date())) {
        slots.push(`${h}:${m}`)
      }
      current += durationMinutes
    }
  }
  return slots
}

type Step = "service" | "datetime" | "form" | "success"

interface Props {
  professional: Professional
  services: Service[]
  availability: Availability[]
}

export function PublicProfileClient({ professional, services, availability }: Props) {
  const [step, setStep] = useState<Step>("service")
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookingResult, setBookingResult] = useState<{ id: string } | null>(null)

  // Semana actual
  const weekDays = useMemo(() => {
    const today = startOfDay(new Date())
    return Array.from({ length: 7 }, (_, i) => addDays(today, weekOffset * 7 + i))
  }, [weekOffset])

  // Slots para la fecha seleccionada
  const slots = useMemo(() => {
    if (!selectedDate || !selectedService) return []
    return generateSlots(selectedDate, availability, selectedService.duration_minutes)
  }, [selectedDate, selectedService, availability])

  const handleSelectService = (svc: Service) => {
    setSelectedService(svc)
    setSelectedDate(null)
    setSelectedTime(null)
    setStep("datetime")
  }

  const handleSelectSlot = (time: string) => {
    setSelectedTime(time)
    setStep("form")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedService || !selectedDate || !selectedTime) return

    setSubmitting(true)
    setError(null)

    try {
      const [h, m] = selectedTime.split(":").map(Number)
      const start = new Date(selectedDate)
      start.setHours(h, m, 0, 0)
      const end = addMinutes(start, selectedService.duration_minutes)

      const booking = await createBooking({
        professionalId: professional.id,
        serviceId: selectedService.id,
        clientEmail: form.email,
        clientName: form.name,
        clientPhone: form.phone || undefined,
        startDatetime: start.toISOString(),
        endDatetime: end.toISOString(),
        notes: form.notes || undefined,
      })

      setBookingResult(booking as { id: string })
      setStep("success")
    } catch (err) {
      setError("No se pudo confirmar la reserva. Intenta de nuevo.")
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const initials = professional.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase()

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

      {/* Perfil del profesional */}
      <div className="flex items-start gap-5 mb-10">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/25">
          {professional.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={professional.avatar_url} alt={professional.name} className="w-full h-full rounded-2xl object-cover" />
          ) : (
            <span className="text-xl font-bold text-primary-foreground">{initials}</span>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{professional.name}</h1>
          {professional.profession && (
            <p className="text-muted-foreground mt-0.5">{professional.profession}</p>
          )}
          {professional.description && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl">{professional.description}</p>
          )}
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8 text-xs font-medium">
        {(["service", "datetime", "form"] as const).map((s, i) => {
          const labels = ["Servicio", "Fecha y hora", "Tus datos"]
          const stepIndex = ["service", "datetime", "form", "success"].indexOf(step)
          const isActive = step === s
          const isDone = stepIndex > i
          return (
            <div key={s} className="flex items-center gap-2">
              {i > 0 && <div className={`h-px w-8 ${isDone ? "bg-primary" : "bg-border"}`} />}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors
                ${isActive ? "bg-primary text-primary-foreground" : isDone ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                <span>{i + 1}</span>
                <span>{labels[i]}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── STEP 1: Servicio ── */}
      {step === "service" && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Elige un servicio</h2>
          {services.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-2xl">
              <Calendar className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p>Este profesional aún no tiene servicios disponibles.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map(svc => (
                <button
                  key={svc.id}
                  onClick={() => handleSelectService(svc)}
                  className="group text-left p-5 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{svc.name}</p>
                      {svc.description && (
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{svc.description}</p>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {svc.duration_minutes} min
                    </span>
                    <span className="font-semibold text-foreground">
                      {svc.price_cents === 0 ? "Gratis" : `$${(svc.price_cents / 100).toLocaleString("es-CO")} ${svc.currency.toUpperCase()}`}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── STEP 2: Fecha y hora ── */}
      {step === "datetime" && selectedService && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep("service")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-4 h-4" /> Volver
            </button>
            <div className="h-4 w-px bg-border" />
            <p className="text-sm text-foreground font-medium">{selectedService.name}</p>
            <span className="text-xs text-muted-foreground">· {selectedService.duration_minutes} min</span>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4">Elige fecha y hora</h2>

          {/* Navegación de semana */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => { setWeekOffset(w => Math.max(0, w - 1)); setSelectedDate(null); setSelectedTime(null) }}
              disabled={weekOffset === 0}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <p className="text-sm font-medium text-foreground">
              {format(weekDays[0], "d MMM", { locale: es })} – {format(weekDays[6], "d MMM yyyy", { locale: es })}
            </p>
            <button
              onClick={() => { setWeekOffset(w => w + 1); setSelectedDate(null); setSelectedTime(null) }}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1.5 mb-6">
            {weekDays.map(day => {
              const dayAvail = availability.filter(a => a.is_active && a.day_of_week === getDay(day))
              const hasSlots = dayAvail.length > 0 && !isBefore(day, startOfDay(new Date()))
              const isSelected = selectedDate && format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => { if (hasSlots) { setSelectedDate(day); setSelectedTime(null) } }}
                  disabled={!hasSlots}
                  className={`flex flex-col items-center py-2.5 rounded-xl text-xs font-medium transition-all
                    ${isSelected ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25" :
                      hasSlots ? "bg-card border border-border hover:border-primary/30 hover:bg-primary/5 text-foreground cursor-pointer" :
                      "bg-muted/30 text-muted-foreground/40 cursor-not-allowed"}`}
                >
                  <span className="text-[10px] uppercase tracking-wide mb-1">{DAYS_ES[getDay(day)]}</span>
                  <span className="text-sm font-bold">{format(day, "d")}</span>
                  {isToday(day) && <span className="w-1 h-1 rounded-full bg-current mt-1 opacity-60" />}
                </button>
              )
            })}
          </div>

          {/* Slots de hora */}
          {selectedDate && (
            <div>
              <p className="text-sm font-medium text-foreground mb-3">
                {DAYS_FULL[getDay(selectedDate)]}, {format(selectedDate, "d 'de' MMMM", { locale: es })}
              </p>
              {slots.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center border border-dashed border-border rounded-xl">
                  No hay horarios disponibles para este día
                </p>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {slots.map(time => (
                    <button
                      key={time}
                      onClick={() => handleSelectSlot(time)}
                      className="py-2 px-3 text-sm font-medium rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 hover:text-primary transition-all"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!selectedDate && (
            <p className="text-sm text-muted-foreground text-center py-6">
              Selecciona un día disponible para ver los horarios
            </p>
          )}
        </div>
      )}

      {/* ── STEP 3: Datos del cliente ── */}
      {step === "form" && selectedService && selectedDate && selectedTime && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep("datetime")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-4 h-4" /> Volver
            </button>
          </div>

          {/* Resumen de la reserva */}
          <div className="p-4 bg-primary/5 border border-primary/15 rounded-2xl mb-6">
            <p className="text-sm font-semibold text-foreground mb-1">{selectedService.name}</p>
            <p className="text-sm text-muted-foreground">
              {DAYS_FULL[getDay(selectedDate)]}, {format(selectedDate, "d 'de' MMMM yyyy", { locale: es })} · {selectedTime}
            </p>
            <p className="text-sm text-muted-foreground">{selectedService.duration_minutes} min · {selectedService.price_cents === 0 ? "Gratis" : `$${(selectedService.price_cents / 100).toLocaleString("es-CO")}`}</p>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4">Tus datos</h2>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            {error && (
              <div className="flex items-center gap-2.5 p-3 text-sm text-destructive bg-destructive/8 border border-destructive/15 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-muted-foreground" /> Nombre completo
              </Label>
              <Input id="name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Tu nombre" className="h-10 bg-muted/40" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" /> Correo electrónico
              </Label>
              <Input id="email" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="tu@correo.com" className="h-10 bg-muted/40" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-muted-foreground" /> Teléfono <span className="text-muted-foreground font-normal">(opcional)</span>
              </Label>
              <Input id="phone" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+57 300 000 0000" className="h-10 bg-muted/40" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes" className="text-sm font-medium flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-muted-foreground" /> Notas <span className="text-muted-foreground font-normal">(opcional)</span>
              </Label>
              <textarea
                id="notes"
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="¿Hay algo que deba saber antes de la cita?"
                rows={3}
                className="w-full rounded-xl border border-input bg-muted/40 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full h-11 font-semibold shadow-sm shadow-primary/20">
              {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Confirmando...</> : "Confirmar reserva"}
            </Button>
          </form>
        </div>
      )}

      {/* ── STEP 4: Éxito ── */}
      {step === "success" && selectedService && selectedDate && selectedTime && (
        <div className="text-center py-12 max-w-md mx-auto">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">¡Reserva confirmada!</h2>
          <p className="mt-2 text-muted-foreground">
            Recibirás un correo de confirmación en <span className="font-medium text-foreground">{form.email}</span>
          </p>

          <div className="mt-6 p-5 bg-card border border-border rounded-2xl text-left space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Servicio</span>
              <span className="font-medium text-foreground">{selectedService.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Profesional</span>
              <span className="font-medium text-foreground">{professional.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fecha</span>
              <span className="font-medium text-foreground">
                {DAYS_FULL[getDay(selectedDate)]}, {format(selectedDate, "d 'de' MMMM yyyy", { locale: es })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hora</span>
              <span className="font-medium text-foreground">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duración</span>
              <span className="font-medium text-foreground">{selectedService.duration_minutes} min</span>
            </div>
          </div>

          <button
            onClick={() => { setStep("service"); setSelectedService(null); setSelectedDate(null); setSelectedTime(null); setForm({ name: "", email: "", phone: "", notes: "" }) }}
            className="mt-6 text-sm text-primary hover:underline underline-offset-4"
          >
            Hacer otra reserva
          </button>
        </div>
      )}
    </main>
  )
}