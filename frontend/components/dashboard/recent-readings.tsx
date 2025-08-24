"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { EnergyReading } from "@/types"

interface RecentReadingsProps {
  readings: EnergyReading[]
  loading?: boolean
}

export function RecentReadings({ readings, loading }: RecentReadingsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Readings</CardTitle>
          <CardDescription>Your latest energy meter readings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const getReadingTypeColor = (type: string) => {
    switch (type) {
      case "AUTOMATIC":
        return "default"
      case "MANUAL":
        return "secondary"
      case "ESTIMATED":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Readings</CardTitle>
        <CardDescription>Your latest energy meter readings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {readings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No readings available</p>
          ) : (
            readings.slice(0, 10).map((reading) => (
              <div key={reading.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium">{reading.kwhConsumed.toFixed(2)} kWh</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(reading.readingDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {reading.meterNumber && <span className="text-xs text-muted-foreground">{reading.meterNumber}</span>}
                  <Badge variant={getReadingTypeColor(reading.readingType)}>{reading.readingType}</Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
