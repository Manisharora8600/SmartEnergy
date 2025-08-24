"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard } from "lucide-react"
import { redirectToCheckout } from "@/lib/stripe"
import type { Bill } from "@/types"

interface PaymentButtonProps {
  bill: Bill
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function PaymentButton({ bill, variant = "default", size = "default", className }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handlePayment = async () => {
    setLoading(true)
    setError("")

    try {
      await redirectToCheckout(bill)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed to initialize")
    } finally {
      setLoading(false)
    }
  }

  if (bill.status !== "PENDING") {
    return null
  }

  return (
    <div className="space-y-2">
      <Button onClick={handlePayment} disabled={loading} variant={variant} size={size} className={className}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
        {loading ? "Processing..." : "Pay Now"}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
