// Type definitions for Energy Billing System

export interface User {
  id: number
  username: string
  email: string
  role: "USER" | "ADMIN"
  firstName: string
  lastName: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface EnergyReading {
  id: number
  userId: number
  readingDate: string
  kwhConsumed: number
  meterNumber?: string
  readingType: "MANUAL" | "AUTOMATIC" | "ESTIMATED"
  createdAt: string
}

export interface Bill {
  id: number
  userId: number
  billNumber: string
  billingPeriodStart: string
  billingPeriodEnd: string
  totalKwh: number
  ratePerKwh: number
  subtotal: number
  taxAmount: number
  totalAmount: number
  status: "PENDING" | "PAID" | "OVERDUE" | "CANCELLED"
  dueDate: string
  paidAt?: string
  stripePaymentIntentId?: string
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: number
  billId: number
  stripePaymentIntentId: string
  amount: number
  currency: string
  status: "PENDING" | "SUCCEEDED" | "FAILED" | "CANCELLED"
  paymentMethod?: string
  paidAt?: string
  createdAt: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  address?: string
  phone?: string
}

export interface CreateReadingRequest {
  readingDate: string
  kwhConsumed: number
  meterNumber?: string
  readingType?: "MANUAL" | "AUTOMATIC" | "ESTIMATED"
}

export interface GenerateBillRequest {
  userId: number
  billingPeriodStart: string
  billingPeriodEnd: string
  ratePerKwh?: number
}

export interface ChartDataPoint {
  date: string
  kwh: number
  cost?: number
}

export interface DashboardStats {
  totalUsers: number
  totalBills: number
  totalRevenue: number
  pendingBills: number
  currentMonthUsage: number
  previousMonthUsage: number
  averageMonthlyBill: number
}
