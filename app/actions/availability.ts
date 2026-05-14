"use server"

import { sql } from "@/lib/db"
import { getCurrentProfessional } from "@/lib/auth"
import { revalidatePath } from "next/cache"

type AvailabilitySlot = {
  day_of_week: number
  start_time: string
  end_time: string
  is_active: boolean
}

export async function saveAvailability(slots: AvailabilitySlot[]) {
  const professional = await getCurrentProfessional()
  if (!professional) {
    throw new Error("No autorizado")
  }

  // Delete existing availability
  await sql`
    DELETE FROM availability WHERE professional_id = ${professional.id}
  `

  // Insert new availability
  for (const slot of slots) {
    await sql`
      INSERT INTO availability (professional_id, day_of_week, start_time, end_time, is_active)
      VALUES (${professional.id}, ${slot.day_of_week}, ${slot.start_time}, ${slot.end_time}, ${slot.is_active})
    `
  }

  revalidatePath("/dashboard/availability", "page")
}

export async function createTimeBlock(formData: FormData) {
  const professional = await getCurrentProfessional()
  if (!professional) {
    throw new Error("No autorizado")
  }

  const startDatetime = formData.get("start_datetime") as string
  const endDatetime = formData.get("end_datetime") as string
  const reason = formData.get("reason") as string || null

  await sql`
    INSERT INTO time_blocks (professional_id, start_datetime, end_datetime, reason)
    VALUES (${professional.id}, ${startDatetime}, ${endDatetime}, ${reason})
  `

  revalidatePath("/dashboard/availability", "page")
}

export async function deleteTimeBlock(blockId: string) {
  const professional = await getCurrentProfessional()
  if (!professional) {
    throw new Error("No autorizado")
  }

  await sql`
    DELETE FROM time_blocks 
    WHERE id = ${blockId} AND professional_id = ${professional.id}
  `

  revalidatePath("/dashboard/availability", "page")
}
