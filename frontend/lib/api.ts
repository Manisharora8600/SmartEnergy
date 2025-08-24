// API functions for energy readings and dashboard data
import type { EnergyReading, CreateReadingRequest, ChartDataPoint, DashboardStats, Bill } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

// Get auth token for API requests
const getToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

// API request helper with auth headers
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken()
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Energy Readings API
export const getEnergyReadings = async (
  userId?: number,
  startDate?: string,
  endDate?: string,
): Promise<EnergyReading[]> => {
  const params = new URLSearchParams()
  if (userId) params.append("userId", userId.toString())
  if (startDate) params.append("startDate", startDate)
  if (endDate) params.append("endDate", endDate)

  return apiRequest(`/readings?${params.toString()}`)
}

export const createEnergyReading = async (reading: CreateReadingRequest): Promise<EnergyReading> => {
  return apiRequest("/readings", {
    method: "POST",
    body: JSON.stringify(reading),
  })
}

export const importReadingsFromCSV = async (file: File): Promise<{ imported: number; errors: string[] }> => {
  const formData = new FormData()
  formData.append("file", file)

  const token = getToken()
  const response = await fetch(`${API_BASE_URL}/readings/import`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Dashboard Statistics
export const getDashboardStats = async (userId?: number): Promise<DashboardStats> => {
  const params = userId ? `?userId=${userId}` : ""
  return apiRequest(`/dashboard/stats${params}`)
}

export const getUsageChartData = async (
  userId?: number,
  period: "week" | "month" | "year" = "month",
): Promise<ChartDataPoint[]> => {
  const params = new URLSearchParams()
  if (userId) params.append("userId", userId.toString())
  params.append("period", period)

  return apiRequest(`/dashboard/usage-chart?${params.toString()}`)
}

// Billing API functions
export const getBills = async (userId?: number, status?: string): Promise<Bill[]> => {
  const params = new URLSearchParams()
  if (userId) params.append("userId", userId.toString())
  if (status) params.append("status", status)

  return apiRequest(`/billing?${params.toString()}`)
}

export const getBillById = async (billId: number): Promise<Bill> => {
  return apiRequest(`/billing/${billId}`)
}

export const generateBill = async (
  userId: number,
  billingPeriodStart: string,
  billingPeriodEnd: string,
  ratePerKwh?: number,
): Promise<Bill> => {
  return apiRequest("/billing/generate", {
    method: "POST",
    body: JSON.stringify({
      userId,
      billingPeriodStart,
      billingPeriodEnd,
      ratePerKwh,
    }),
  })
}

export const markBillAsPaid = async (billId: number): Promise<Bill> => {
  return apiRequest(`/billing/mark-paid/${billId}`, {
    method: "POST",
  })
}
