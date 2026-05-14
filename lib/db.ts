import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL!)

export type Professional = {
  id: string
  email: string
  password_hash: string
  name: string
  slug: string
  profession: string | null
  description: string | null
  avatar_url: string | null
  phone: string | null
  timezone: string
  stripe_account_id: string | null
  created_at: string
  updated_at: string
}

export type Service = {
  id: string
  professional_id: string
  name: string
  description: string | null
  duration_minutes: number
  price_cents: number
  currency: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Availability = {
  id: string
  professional_id: string
  day_of_week: number
  start_time: string
  end_time: string
  is_active: boolean
}

export type TimeBlock = {
  id: string
  professional_id: string
  start_datetime: string
  end_datetime: string
  reason: string | null
  created_at: string
}

export type Client = {
  id: string
  email: string
  name: string
  phone: string | null
  notes: string | null
  created_at: string
}

export type Booking = {
  id: string
  professional_id: string
  service_id: string
  client_id: string
  start_datetime: string
  end_datetime: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes: string | null
  created_at: string
  updated_at: string
}

export type Payment = {
  id: string
  booking_id: string
  stripe_payment_intent_id: string | null
  stripe_checkout_session_id: string | null
  amount_cents: number
  currency: string
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded'
  created_at: string
  updated_at: string
}

export type BookingWithDetails = Booking & {
  client_name: string
  client_email: string
  client_phone: string | null
  service_name: string
  service_price: number
  service_duration: number
}

// Query functions
export async function getServices(professionalId: string): Promise<Service[]> {
  const result = await sql`
    SELECT * FROM services 
    WHERE professional_id = ${professionalId}
    ORDER BY created_at DESC
  `
  return result as Service[]
}

export async function getService(serviceId: string): Promise<Service | null> {
  const result = await sql`
    SELECT * FROM services WHERE id = ${serviceId}
  `
  return (result[0] as Service) || null
}

export async function getAvailability(professionalId: string): Promise<Availability[]> {
  const result = await sql`
    SELECT * FROM availability 
    WHERE professional_id = ${professionalId}
    ORDER BY day_of_week, start_time
  `
  return result as Availability[]
}

export async function getTimeBlocks(professionalId: string, startDate?: string, endDate?: string): Promise<TimeBlock[]> {
  if (startDate && endDate) {
    const result = await sql`
      SELECT * FROM time_blocks 
      WHERE professional_id = ${professionalId}
        AND start_datetime >= ${startDate}
        AND end_datetime <= ${endDate}
      ORDER BY start_datetime
    `
    return result as TimeBlock[]
  }
  const result = await sql`
    SELECT * FROM time_blocks 
    WHERE professional_id = ${professionalId}
    ORDER BY start_datetime DESC
    LIMIT 100
  `
  return result as TimeBlock[]
}

export async function getClients(professionalId: string): Promise<Client[]> {
  const result = await sql`
    SELECT DISTINCT c.* FROM clients c
    INNER JOIN bookings b ON b.client_id = c.id
    WHERE b.professional_id = ${professionalId}
    ORDER BY c.created_at DESC
  `
  return result as Client[]
}

export async function getClient(clientId: string): Promise<Client | null> {
  const result = await sql`
    SELECT * FROM clients WHERE id = ${clientId}
  `
  return (result[0] as Client) || null
}

export async function getOrCreateClient(email: string, name: string, phone?: string): Promise<Client> {
  const existing = await sql`
    SELECT * FROM clients WHERE email = ${email}
  `
  if (existing.length > 0) {
    return existing[0] as Client
  }
  const result = await sql`
    INSERT INTO clients (email, name, phone)
    VALUES (${email}, ${name}, ${phone || null})
    RETURNING *
  `
  return result[0] as Client
}

export async function getBookings(professionalId: string): Promise<BookingWithDetails[]> {
  const result = await sql`
    SELECT 
      b.*,
      c.name as client_name,
      c.email as client_email,
      c.phone as client_phone,
      s.name as service_name,
      s.price_cents as service_price,
      s.duration_minutes as service_duration
    FROM bookings b
    INNER JOIN clients c ON c.id = b.client_id
    INNER JOIN services s ON s.id = b.service_id
    WHERE b.professional_id = ${professionalId}
    ORDER BY b.start_datetime DESC
  `
  return result as BookingWithDetails[]
}

export async function getBooking(bookingId: string): Promise<BookingWithDetails | null> {
  const result = await sql`
    SELECT 
      b.*,
      c.name as client_name,
      c.email as client_email,
      c.phone as client_phone,
      s.name as service_name,
      s.price_cents as service_price,
      s.duration_minutes as service_duration
    FROM bookings b
    INNER JOIN clients c ON c.id = b.client_id
    INNER JOIN services s ON s.id = b.service_id
    WHERE b.id = ${bookingId}
  `
  return (result[0] as BookingWithDetails) || null
}

export async function getBookingsForDate(professionalId: string, date: string): Promise<Booking[]> {
  const result = await sql`
    SELECT * FROM bookings 
    WHERE professional_id = ${professionalId}
      AND DATE(start_datetime) = ${date}
      AND status != 'cancelled'
    ORDER BY start_datetime
  `
  return result as Booking[]
}

export async function getProfessionalBySlug(slug: string): Promise<Professional | null> {
  const result = await sql`
    SELECT * FROM professionals WHERE slug = ${slug}
  `
  return (result[0] as Professional) || null
}

export async function getActiveServices(professionalId: string): Promise<Service[]> {
  const result = await sql`
    SELECT * FROM services 
    WHERE professional_id = ${professionalId} AND is_active = true
    ORDER BY name
  `
  return result as Service[]
}
