// Stripe payment integration utilities
import type { Bill } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

// Get auth token for API requests
const getToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

// Create Stripe checkout session
export const createCheckoutSession = async (billId: number): Promise<{ url: string }> => {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}/stripe/create-checkout-session?billId=${billId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Redirect to Stripe checkout
export const redirectToCheckout = async (bill: Bill): Promise<void> => {
  try {
    const { url } = await createCheckoutSession(bill.id)
    window.location.href = url
  } catch (error) {
    console.error("Failed to create checkout session:", error)
    throw error
  }
}
