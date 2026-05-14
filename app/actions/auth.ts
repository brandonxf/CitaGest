'use server'

import { redirect } from 'next/navigation'
import { sql } from '@/lib/db'
import { 
  hashPassword, 
  verifyPassword, 
  createToken, 
  setAuthCookie, 
  removeAuthCookie,
  generateSlug 
} from '@/lib/auth'

export type AuthState = {
  error?: string
  success?: boolean
}

export async function registerAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const profession = formData.get('profession') as string

  if (!name || !email || !password) {
    return { error: 'Todos los campos son requeridos' }
  }

  if (password.length < 8) {
    return { error: 'La contraseña debe tener al menos 8 caracteres' }
  }

  try {
    // Check if email already exists
    const existing = await sql`
      SELECT id FROM professionals WHERE email = ${email}
    `
    
    if (existing.length > 0) {
      return { error: 'Este correo ya está registrado' }
    }

    const passwordHash = await hashPassword(password)
    const slug = generateSlug(name)

    const result = await sql`
      INSERT INTO professionals (email, password_hash, name, slug, profession)
      VALUES (${email}, ${passwordHash}, ${name}, ${slug}, ${profession || null})
      RETURNING id, email
    `

    const professional = result[0]
    const token = createToken({ 
      professionalId: professional.id, 
      email: professional.email 
    })
    
    await setAuthCookie(token)
  } catch (error) {
    console.error('Registration error:', error)
    return { error: 'Error al crear la cuenta. Intenta de nuevo.' }
  }

  redirect('/dashboard')
}

export async function loginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Correo y contraseña son requeridos' }
  }

  try {
    const result = await sql`
      SELECT id, email, password_hash FROM professionals WHERE email = ${email}
    `
    
    const professional = result[0]
    
    if (!professional) {
      return { error: 'Credenciales inválidas' }
    }

    const isValid = await verifyPassword(password, professional.password_hash)
    
    if (!isValid) {
      return { error: 'Credenciales inválidas' }
    }

    const token = createToken({ 
      professionalId: professional.id, 
      email: professional.email 
    })
    
    await setAuthCookie(token)
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Error al iniciar sesión. Intenta de nuevo.' }
  }

  redirect('/dashboard')
}

export async function logoutAction() {
  await removeAuthCookie()
  redirect('/')
}
