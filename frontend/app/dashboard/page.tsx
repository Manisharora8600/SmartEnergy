"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardNav } from "@/components/layout/dashboard-nav"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { UsageChart } from "@/components/dashboard/usage-chart"
import { RecentReadings } from "@/components/dashboard/recent-readings"
import { AddReadingForm } from "@/components/dashboard/add-reading-form"
import { getDashboardStats, getUsageChartData, getEnergyReadings } from "@/lib/api"
import type { DashboardStats, ChartDataPoint, EnergyReading } from "@/types"

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [readings, setReadings] = useState<EnergyReading[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsData, chartDataResponse, readingsData] = await Promise.all([
        getDashboardStats(),
        getUsageChartData(undefined, "month"),
        getEnergyReadings(),
      ])

      setStats(statsData)
      setChartData(chartDataResponse)
      setReadings(readingsData)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleReadingAdded = () => {
    fetchDashboardData()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardNav />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Energy Dashboard</h1>
            <p className="text-muted-foreground">Monitor your energy usage and manage your account</p>
          </div>

          <div className="space-y-8">
            {/* Stats Cards */}
            <StatsCards
              stats={
                stats || {
                  totalUsers: 0,
                  totalBills: 0,
                  totalRevenue: 0,
                  pendingBills: 0,
                  currentMonthUsage: 0,
                  previousMonthUsage: 0,
                  averageMonthlyBill: 0,
                }
              }
              loading={loading}
            />

            {/* Usage Chart */}
            <UsageChart
              data={chartData}
              loading={loading}
              title="Monthly Energy Usage"
              description="Your energy consumption over the past month"
            />

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Readings */}
              <RecentReadings readings={readings} loading={loading} />

              {/* Add Reading Form */}
              <AddReadingForm onReadingAdded={handleReadingAdded} />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
