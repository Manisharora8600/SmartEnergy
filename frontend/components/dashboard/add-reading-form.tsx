"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus } from "lucide-react"
import { createEnergyReading } from "@/lib/api"
import type { CreateReadingRequest } from "@/types"

interface AddReadingFormProps {
  onReadingAdded?: () => void
}

export function AddReadingForm({ onReadingAdded }: AddReadingFormProps) {
  const [formData, setFormData] = useState<CreateReadingRequest>({
    readingDate: new Date().toISOString().split("T")[0],
    kwhConsumed: 0,
    meterNumber: "",
    readingType: "MANUAL",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      await createEnergyReading(formData)
      setSuccess(true)
      setFormData({
        readingDate: new Date().toISOString().split("T")[0],
        kwhConsumed: 0,
        meterNumber: "",
        readingType: "MANUAL",
      })
      onReadingAdded?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add reading")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "kwhConsumed" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Reading
        </CardTitle>
        <CardDescription>Record a new energy meter reading</CardDescription>
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
              <AlertDescription>Reading added successfully!</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="readingDate">Reading Date</Label>
              <Input
                id="readingDate"
                name="readingDate"
                type="date"
                value={formData.readingDate}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kwhConsumed">kWh Consumed</Label>
              <Input
                id="kwhConsumed"
                name="kwhConsumed"
                type="number"
                step="0.01"
                min="0"
                value={formData.kwhConsumed}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meterNumber">Meter Number (Optional)</Label>
              <Input
                id="meterNumber"
                name="meterNumber"
                value={formData.meterNumber}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="readingType">Reading Type</Label>
              <Select
                value={formData.readingType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, readingType: value as "MANUAL" | "AUTOMATIC" | "ESTIMATED" }))
                }
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MANUAL">Manual</SelectItem>
                  <SelectItem value="AUTOMATIC">Automatic</SelectItem>
                  <SelectItem value="ESTIMATED">Estimated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Reading
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
