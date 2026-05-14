"use server"

import { sql } from "@/lib/db"
import { getCurrentProfessional } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function createService(formData: FormData) {
  const professional = await getCurrentProfessional()
  if (!professional) {
    throw new Error("No autorizado")
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string || null
  const duration = parseInt(formData.get("duration") as string)
  const price = parseFloat(formData.get("price") as string)
  const isActive = formData.get("is_active") === "on"

  if (!name || !duration || isNaN(price)) {
    throw new Error("Datos inválidos")
  }

  await sql`
    INSERT INTO services (professional_id, name, description, duration_minutes, price_cents, is_active)
    VALUES (${professional.id}, ${name}, ${description}, ${duration}, ${Math.round(price * 100)}, ${isActive})
  `

  revalidatePath("/dashboard/services", "page")
}

export async function updateService(serviceId: string, formData: FormData) {
  const professional = await getCurrentProfessional()
  if (!professional) {
    throw new Error("No autorizado")
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string || null
  const duration = parseInt(formData.get("duration") as string)
  const price = parseFloat(formData.get("price") as string)
  const isActive = formData.get("is_active") === "on"

  if (!name || !duration || isNaN(price)) {
    throw new Error("Datos inválidos")
  }

  await sql`
    UPDATE services 
    SET name = ${name}, 
        description = ${description}, 
        duration_minutes = ${duration}, 
        price_cents = ${Math.round(price * 100)}, 
        is_active = ${isActive},
        updated_at = NOW()
    WHERE id = ${serviceId} AND professional_id = ${professional.id}
  `

  revalidatePath("/dashboard/services", "page")
}

export async function deleteService(serviceId: string) {
  const professional = await getCurrentProfessional()
  if (!professional) {
    throw new Error("No autorizado")
  }

  await sql`
    DELETE FROM services 
    WHERE id = ${serviceId} AND professional_id = ${professional.id}
  `

  revalidatePath("/dashboard/services", "page")
}
