"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Bill } from "@/types"

interface BillDetailsModalProps {
  bill: Bill | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BillDetailsModal({ bill, open, onOpenChange }: BillDetailsModalProps) {
  if (!bill) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {bill.billNumber}
            <Badge variant={getStatusColor(bill.status)}>{bill.status}</Badge>
          </DialogTitle>
          <DialogDescription>
            Billing Period: {formatDate(bill.billingPeriodStart)} - {formatDate(bill.billingPeriodEnd)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Usage Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total kWh Consumed:</span>
                <span>{bill.totalKwh.toFixed(2)} kWh</span>
              </div>
              <div className="flex justify-between">
                <span>Rate per kWh:</span>
                <span>${bill.ratePerKwh.toFixed(4)}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Billing Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${bill.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${bill.taxAmount.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total Amount:</span>
                <span>${bill.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Payment Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Due Date:</span>
                <span>{formatDate(bill.dueDate)}</span>
              </div>
              {bill.paidAt && (
                <div className="flex justify-between">
                  <span>Paid On:</span>
                  <span>{formatDate(bill.paidAt)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Created:</span>
                <span>{formatDate(bill.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
