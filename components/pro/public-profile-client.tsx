"use client"

import { useState, useMemo } from "react"
import { format, addDays, startOfDay, isBefore, isToday, addMinutes, getDay } from "date-fns"
import { es } from "date-fns/locale"
import { createBooking } from "@/app/actions/bookings"
import type { Professional, Service, Availability } from "@/lib/db"
import {
  Clock, ChevronLeft, ChevronRight, CheckCircle2,
  User, Mail, Phone, FileText, Loader2, Calendar, AlertCircle, MapPin
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DAYS_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const DAYS_FULL = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

function generateSlots(date: Date, availability: Availability[], durationMinutes: number): string[] {
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
      if (!isBefore(slotStart, new Date())) slots.push(`${h}:${m}`)
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

  const weekDays = useMemo(() => {
    const today = startOfDay(new Date())
    return Array.from({ length: 7 }, (_, i) => addDays(today, weekOffset * 7 + i))
  }, [weekOffset])

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
      await createBooking({
        professionalId: professional.id,
        serviceId: selectedService.id,
        clientEmail: form.email,
        clientName: form.name,
        clientPhone: form.phone || undefined,
        startDatetime: start.toISOString(),
        endDatetime: end.toISOString(),
        notes: form.notes || undefined,
      })
      setStep("success")
    } catch (err) {
      setError("No se pudo confirmar la reserva. Intenta de nuevo.")
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const initials = professional.name.split(" ").map((w: string) => w[0]).join("").substring(0, 2).toUpperCase()

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6">

      {/* ── HERO del profesional ── */}
      <div className="relative py-12 sm:py-16">
        {/* Fondo decorativo */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/6 blur-3xl" />
        </div>

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary shadow-xl shadow-primary/20 flex items-center justify-center overflow-hidden">
              {professional.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={professional.avatar_url} alt={professional.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl sm:text-3xl font-bold text-primary-foreground">{initials}</span>
              )}
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{professional.name}</h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Disponible
              </span>
            </div>
            {professional.profession && (
              <p className="mt-1 text-base text-muted-foreground font-medium">{professional.profession}</p>
            )}
            {professional.description && (
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">{professional.description}</p>
            )}
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {services.length} {services.length === 1 ? "servicio" : "servicios"}
              </span>
              {professional.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {professional.phone}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <div className="pb-16">

        {/* Stepper */}
        {step !== "success" && (
          <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-1">
            {(["service", "datetime", "form"] as const).map((s, i) => {
              const labels = ["Servicio", "Fecha y hora", "Tus datos"]
              const stepIndex = ["service", "datetime", "form"].indexOf(step)
              const isActive = step === s
              const isDone = stepIndex > i
              return (
                <div key={s} className="flex items-center gap-1 shrink-0">
                  {i > 0 && (
                    <div className={`h-px w-6 sm:w-10 transition-colors ${isDone ? "bg-primary" : "bg-border"}`} />
                  )}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap
                    ${isActive ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25" :
                      isDone ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"}`}>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold
                      ${isActive ? "bg-white/20" : isDone ? "bg-primary/20" : "bg-muted-foreground/20"}`}>
                      {isDone ? "✓" : i + 1}
                    </span>
                    {labels[i]}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── STEP 1: Servicios ── */}
        {step === "service" && (
          <div>
            <div className="mb-5">
              <h2 className="text-lg font-bold text-foreground">Elige un servicio</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Selecciona el tipo de consulta que necesitas</p>
            </div>

            {services.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-2xl">
                <Calendar className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
                <p className="text-muted-foreground font-medium">Sin servicios disponibles</p>
                <p className="text-sm text-muted-foreground/60 mt-1">Este profesional aún no ha configurado sus servicios</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((svc, i) => {
                  const colors = ["bg-indigo-500", "bg-violet-500", "bg-sky-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500"]
                  const color = colors[i % colors.length]
                  return (
                    <button
                      key={svc.id}
                      onClick={() => handleSelectService(svc)}
                      className="group relative text-left p-5 bg-card border border-border rounded-2xl hover:border-primary/25 hover:shadow-lg hover:shadow-primary/8 transition-all duration-200 overflow-hidden"
                    >
                      <div aria-hidden className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/3 -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
                      <div className="relative">
                        <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center mb-3 shadow-sm`}>
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{svc.name}</p>
                        {svc.description && (
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">{svc.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-3.5 h-3.5" />
                              {svc.duration_minutes} min
                            </span>
                          </div>
                          <span className="text-base font-bold text-foreground">
                            {svc.price_cents === 0 ? (
                              <span className="text-emerald-600">Gratis</span>
                            ) : (
                              `$${(svc.price_cents / 100).toLocaleString("es-CO")}`
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: Fecha y hora ── */}
        {step === "datetime" && selectedService && (
          <div>
            {/* Cabecera con servicio seleccionado */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setStep("service")}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Volver
              </button>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-foreground">{selectedService.name}</span>
                <span className="text-muted-foreground">· {selectedService.duration_minutes} min</span>
                {selectedService.price_cents > 0 && (
                  <span className="text-muted-foreground">· ${(selectedService.price_cents / 100).toLocaleString("es-CO")}</span>
                )}
              </div>
            </div>

            <div className="mb-5">
              <h2 className="text-lg font-bold text-foreground">Elige fecha y hora</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Los días disponibles aparecen resaltados</p>
            </div>

            {/* Calendario */}
            <div className="bg-card border border-border rounded-2xl p-5 mb-5">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => { setWeekOffset(w => Math.max(0, w - 1)); setSelectedDate(null) }}
                  disabled={weekOffset === 0}
                  className="w-8 h-8 rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <p className="text-sm font-semibold text-foreground">
                  {format(weekDays[0], "d MMM", { locale: es })} — {format(weekDays[6], "d 'de' MMMM", { locale: es })}
                </p>
                <button
                  onClick={() => { setWeekOffset(w => w + 1); setSelectedDate(null) }}
                  className="w-8 h-8 rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {weekDays.map(day => {
                  const dayAvail = availability.filter(a => a.is_active && a.day_of_week === getDay(day))
                  const hasSlots = dayAvail.length > 0 && !isBefore(day, startOfDay(new Date()))
                  const isSelected = selectedDate && format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                  const todayDay = isToday(day)

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => { if (hasSlots) { setSelectedDate(day); setSelectedTime(null) } }}
                      disabled={!hasSlots}
                      className={`relative flex flex-col items-center py-2.5 rounded-xl text-xs font-medium transition-all
                        ${isSelected
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                          : hasSlots
                            ? "hover:bg-primary/8 text-foreground cursor-pointer"
                            : "text-muted-foreground/30 cursor-not-allowed"
                        }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider mb-1 opacity-70">{DAYS_ES[getDay(day)]}</span>
                      <span className={`text-sm font-bold ${todayDay && !isSelected ? "text-primary" : ""}`}>
                        {format(day, "d")}
                      </span>
                      {hasSlots && !isSelected && (
                        <span className="w-1 h-1 rounded-full bg-primary/40 mt-1" />
                      )}
                      {todayDay && <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-primary opacity-60" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Slots */}
            {selectedDate ? (
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">
                  {DAYS_FULL[getDay(selectedDate)]}, {format(selectedDate, "d 'de' MMMM", { locale: es })}
                </p>
                {slots.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-border rounded-xl">
                    <p className="text-sm text-muted-foreground">No hay horarios disponibles para este día</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    {slots.map(time => (
                      <button
                        key={time}
                        onClick={() => handleSelectSlot(time)}
                        className="py-2.5 text-sm font-semibold rounded-xl border border-border bg-card hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-sm hover:shadow-primary/20 transition-all"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-muted-foreground">
                <Calendar className="w-6 h-6 mx-auto mb-2 opacity-30" />
                Selecciona un día disponible para ver los horarios
              </div>
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

            <div className="grid sm:grid-cols-5 gap-6">
              {/* Formulario */}
              <div className="sm:col-span-3">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-foreground">Completa tus datos</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">Te enviaremos la confirmación por correo</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                      placeholder="Tu nombre completo" className="h-10 bg-muted/40 border-border/80" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground" /> Correo electrónico
                    </Label>
                    <Input id="email" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="tu@correo.com" className="h-10 bg-muted/40 border-border/80" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                      Teléfono <span className="text-muted-foreground font-normal ml-1">(opcional)</span>
                    </Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+57 300 000 0000" className="h-10 bg-muted/40 border-border/80" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="notes" className="text-sm font-medium flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                      Notas <span className="text-muted-foreground font-normal ml-1">(opcional)</span>
                    </Label>
                    <textarea
                      id="notes"
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      placeholder="¿Algo que deba saber antes de la cita?"
                      rows={3}
                      className="w-full rounded-xl border border-input bg-muted/40 px-3 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                    />
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full h-11 font-semibold shadow-sm shadow-primary/20 hover:shadow-primary/35 transition-all">
                    {submitting
                      ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Confirmando reserva...</>
                      : "Confirmar reserva"}
                  </Button>
                </form>
              </div>

              {/* Resumen sticky */}
              <div className="sm:col-span-2">
                <div className="sticky top-20 p-5 bg-primary/5 border border-primary/15 rounded-2xl space-y-4">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Resumen</p>
                  <div>
                    <p className="font-semibold text-foreground">{selectedService.name}</p>
                    {selectedService.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{selectedService.description}</p>
                    )}
                  </div>
                  <div className="space-y-2 text-sm border-t border-primary/10 pt-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 shrink-0 text-primary/60" />
                      <span>{DAYS_FULL[getDay(selectedDate)]}, {format(selectedDate, "d 'de' MMMM", { locale: es })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 shrink-0 text-primary/60" />
                      <span>{selectedTime} · {selectedService.duration_minutes} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-3.5 h-3.5 shrink-0 text-primary/60" />
                      <span>{professional.name}</span>
                    </div>
                  </div>
                  <div className="border-t border-primary/10 pt-3 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="text-lg font-bold text-foreground">
                      {selectedService.price_cents === 0
                        ? <span className="text-emerald-600">Gratis</span>
                        : `$${(selectedService.price_cents / 100).toLocaleString("es-CO")}`
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Confirmación ── */}
        {step === "success" && selectedService && selectedDate && selectedTime && (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="relative inline-flex mb-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground">¡Reserva confirmada!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Hemos enviado un correo de confirmación a{" "}
              <span className="font-semibold text-foreground">{form.email}</span>
            </p>

            <div className="mt-6 bg-card border border-border rounded-2xl p-5 text-left space-y-3">
              {[
                { label: "Servicio", value: selectedService.name },
                { label: "Profesional", value: professional.name },
                { label: "Fecha", value: `${DAYS_FULL[getDay(selectedDate)]}, ${format(selectedDate, "d 'de' MMMM yyyy", { locale: es })}` },
                { label: "Hora", value: selectedTime },
                { label: "Duración", value: `${selectedService.duration_minutes} min` },
                {
                  label: "Total",
                  value: selectedService.price_cents === 0 ? "Gratis" : `$${(selectedService.price_cents / 100).toLocaleString("es-CO")}`
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start gap-3 text-sm">
                  <span className="text-muted-foreground shrink-0">{label}</span>
                  <span className="font-medium text-foreground text-right">{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setStep("service")
                setSelectedService(null)
                setSelectedDate(null)
                setSelectedTime(null)
                setForm({ name: "", email: "", phone: "", notes: "" })
              }}
              className="mt-6 text-sm text-primary hover:underline underline-offset-4"
            >
              Hacer otra reserva
            </button>
          </div>
        )}
      </div>
    </main>
  )
}