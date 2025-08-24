"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardNav } from "@/components/layout/dashboard-nav"
import { BillsList } from "@/components/billing/bills-list"
import { GenerateBillForm } from "@/components/billing/generate-bill-form"
import { getBills } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"
import type { Bill } from "@/types"

export default function BillsPage() {
  const { user } = useAuth()
  const [bills, setBills] = useState<Bill[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBills = async () => {
    if (!user) return

    try {
      setLoading(true)
      const billsData = await getBills(user.id)
      setBills(billsData)
    } catch (error) {
      console.error("Failed to fetch bills:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBills()
  }, [user])

  const handleBillGenerated = () => {
    fetchBills()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardNav />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bills & Payments</h1>
            <p className="text-muted-foreground">Manage your energy bills and payment history</p>
          </div>

          <div className="space-y-8">
            {/* Generate Bill Form */}
            <div className="max-w-md">
              <GenerateBillForm onBillGenerated={handleBillGenerated} />
            </div>

            {/* Bills List */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Bills</h2>
              <BillsList bills={bills} loading={loading} />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
