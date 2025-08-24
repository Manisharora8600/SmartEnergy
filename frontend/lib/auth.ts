// Authentication utilities and API functions
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

// Token management
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

export const setToken = (token: string): void => {
  localStorage.setItem("auth_token", token)
}

export const removeToken = (): void => {
  localStorage.removeItem("auth_token")
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

// Auth API functions
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  })
}

export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  })
}

export const getCurrentUser = async (): Promise<User> => {
  return apiRequest("/auth/me")
}

export const logout = async (): Promise<void> => {
  removeToken()
}

// JWT token validation
export const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}
