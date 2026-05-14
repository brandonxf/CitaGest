"use server"

import { sql, getOrCreateClient } from "@/lib/db"
import { getCurrentProfessional } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function updateBookingStatus(
  bookingId: string,
  status: "confirmed" | "cancelled" | "completed"
) {
  const professional = await getCurrentProfessional()
  if (!professional) {
    throw new Error("No autorizado")
  }

  await sql`
    UPDATE bookings 
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${bookingId} AND professional_id = ${professional.id}
  `

  revalidatePath("/dashboard/bookings", "page")
  revalidatePath("/dashboard", "page")
}

export async function createBooking(data: {
  professionalId: string
  serviceId: string
  clientEmail: string
  clientName: string
  clientPhone?: string
  startDatetime: string
  endDatetime: string
  notes?: string
}) {
  // Get or create client
  const client = await getOrCreateClient(
    data.clientEmail,
    data.clientName,
    data.clientPhone
  )

  // Create booking
  const result = await sql`
    INSERT INTO bookings (
      professional_id, 
      service_id, 
      client_id, 
      start_datetime, 
      end_datetime, 
      notes,
      status
    )
    VALUES (
      ${data.professionalId}, 
      ${data.serviceId}, 
      ${client.id}, 
      ${data.startDatetime}, 
      ${data.endDatetime}, 
      ${data.notes || null},
      'pending'
    )
    RETURNING *
  `

  return result[0]
}
