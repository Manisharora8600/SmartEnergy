"use client"

import { useState } from "react"
import { BillCard } from "./bill-card"
import { BillDetailsModal } from "./bill-details-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { Bill } from "@/types"

interface BillsListProps {
  bills: Bill[]
  loading?: boolean
}

export function BillsList({ bills, loading }: BillsListProps) {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBills = bills.filter((bill) => {
    const matchesStatus = statusFilter === "all" || bill.status === statusFilter
    const matchesSearch =
      searchTerm === "" ||
      bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.totalAmount.toString().includes(searchTerm)
    return matchesStatus && matchesSearch
  })

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bills</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
            <SelectItem value="OVERDUE">Overdue</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bills Grid */}
      {filteredBills.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No bills found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBills.map((bill) => (
            <BillCard key={bill.id} bill={bill} onViewDetails={setSelectedBill} />
          ))}
        </div>
      )}

      {/* Bill Details Modal */}
      <BillDetailsModal
        bill={selectedBill}
        open={!!selectedBill}
        onOpenChange={(open) => !open && setSelectedBill(null)}
      />
    </div>
  )
}
