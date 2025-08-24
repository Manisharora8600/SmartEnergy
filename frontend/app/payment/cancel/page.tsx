"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export default function PaymentCancelPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-red-100 dark:bg-red-900 rounded-full w-fit">
            <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl text-red-600 dark:text-red-400">Payment Cancelled</CardTitle>
          <CardDescription>Your payment was cancelled and no charges were made</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            You can try again or contact support if you're experiencing issues with payment.
          </p>

          <div className="flex gap-2">
            <Button onClick={() => router.push("/bills")} className="flex-1">
              Back to Bills
            </Button>
            <Button onClick={() => router.push("/dashboard")} variant="outline" className="flex-1">
              Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
