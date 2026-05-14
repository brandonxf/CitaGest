"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Check, X, CheckCircle } from "lucide-react"
import { updateBookingStatus } from "@/app/actions/bookings"
import type { BookingWithDetails } from "@/lib/db"

interface BookingActionsProps {
  booking: BookingWithDetails
}

export function BookingActions({ booking }: BookingActionsProps) {
  const [loading, setLoading] = useState(false)

  async function handleStatusChange(status: "confirmed" | "cancelled" | "completed") {
    setLoading(true)
    try {
      await updateBookingStatus(booking.id, status)
    } catch (error) {
      console.error("Error updating booking:", error)
    } finally {
      setLoading(false)
    }
  }

  if (booking.status === "completed" || booking.status === "cancelled") {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={loading}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {booking.status === "pending" && (
          <DropdownMenuItem onClick={() => handleStatusChange("confirmed")}>
            <Check className="h-4 w-4 mr-2" />
            Confirmar
          </DropdownMenuItem>
        )}
        {booking.status === "confirmed" && (
          <DropdownMenuItem onClick={() => handleStatusChange("completed")}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar como completada
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={() => handleStatusChange("cancelled")}
          className="text-destructive"
        >
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
