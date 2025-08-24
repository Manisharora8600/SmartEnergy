"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PaymentButton } from "./payment-button"
import { Calendar, DollarSign, Zap } from "lucide-react"
import type { Bill } from "@/types"

interface BillCardProps {
  bill: Bill
  onViewDetails?: (bill: Bill) => void
}

export function BillCard({ bill, onViewDetails }: BillCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "default"
      case "PENDING":
        return "secondary"
      case "OVERDUE":
        return "destructive"
      case "CANCELLED":
        return "outline"
      default:
        return "secondary"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isOverdue = bill.status === "PENDING" && new Date(bill.dueDate) < new Date()

  return (
    <Card className={`${isOverdue ? "border-destructive" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{bill.billNumber}</CardTitle>
          <Badge variant={getStatusColor(bill.status)}>{bill.status}</Badge>
        </div>
        <CardDescription>
          Billing Period: {formatDate(bill.billingPeriodStart)} - {formatDate(bill.billingPeriodEnd)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{bill.totalKwh.toFixed(2)} kWh</p>
                <p className="text-xs text-muted-foreground">Total Usage</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">${bill.totalAmount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Total Amount</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Due: {formatDate(bill.dueDate)}</p>
              {isOverdue && <p className="text-xs text-destructive">Overdue</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onViewDetails?.(bill)}>
              View Details
            </Button>
            <PaymentButton bill={bill} size="sm" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
