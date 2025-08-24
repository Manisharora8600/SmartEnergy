"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, FileText } from "lucide-react"
import { generateBill } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"

interface GenerateBillFormProps {
  onBillGenerated?: () => void
}

export function GenerateBillForm({ onBillGenerated }: GenerateBillFormProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    billingPeriodStart: "",
    billingPeriodEnd: "",
    ratePerKwh: 0.12,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      await generateBill(user.id, formData.billingPeriodStart, formData.billingPeriodEnd, formData.ratePerKwh)
      setSuccess(true)
      setFormData({
        billingPeriodStart: "",
        billingPeriodEnd: "",
        ratePerKwh: 0.12,
      })
      onBillGenerated?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate bill")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "ratePerKwh" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Generate New Bill
        </CardTitle>
        <CardDescription>Create a bill for a specific billing period</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>Bill generated successfully!</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billingPeriodStart">Billing Period Start</Label>
              <Input
                id="billingPeriodStart"
                name="billingPeriodStart"
                type="date"
                value={formData.billingPeriodStart}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingPeriodEnd">Billing Period End</Label>
              <Input
                id="billingPeriodEnd"
                name="billingPeriodEnd"
                type="date"
                value={formData.billingPeriodEnd}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ratePerKwh">Rate per kWh ($)</Label>
            <Input
              id="ratePerKwh"
              name="ratePerKwh"
              type="number"
              step="0.0001"
              min="0"
              value={formData.ratePerKwh}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Bill
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
