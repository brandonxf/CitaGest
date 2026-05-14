"use server"

import { sql } from "@/lib/db"
import { getCurrentProfessional } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  const professional = await getCurrentProfessional()
  if (!professional) {
    throw new Error("No autorizado")
  }

  const name = formData.get("name") as string
  const profession = formData.get("profession") as string || null
  const phone = formData.get("phone") as string || null
  const description = formData.get("description") as string || null
  const slug = (formData.get("slug") as string).toLowerCase().trim()

  if (!name || !slug) {
    throw new Error("Nombre y URL son requeridos")
  }

  // Check if slug is already taken by another professional
  if (slug !== professional.slug) {
    const existing = await sql`
      SELECT id FROM professionals WHERE slug = ${slug} AND id != ${professional.id}
    `
    if (existing.length > 0) {
      throw new Error("Esta URL ya está en uso")
    }
  }

  await sql`
    UPDATE professionals 
    SET 
      name = ${name}, 
      profession = ${profession}, 
      phone = ${phone}, 
      description = ${description},
      slug = ${slug},
      updated_at = NOW()
    WHERE id = ${professional.id}
  `

  revalidatePath("/dashboard/settings", "page")
  revalidatePath("/dashboard", "layout")
}
