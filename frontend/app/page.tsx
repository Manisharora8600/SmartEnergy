import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Users, DollarSign, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-full">
              <Zap className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Smart Energy Billing</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            A comprehensive energy usage tracking and billing dashboard with automated payments, role-based access, and
            real-time analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto p-3 bg-green-100 dark:bg-green-900 rounded-full w-fit mb-4">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Usage Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor daily and monthly energy consumption with interactive charts and analytics.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-fit mb-4">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Automated Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate bills automatically with Stripe integration for secure online payments.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Role-Based Access</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Secure JWT authentication with separate user and admin dashboards.</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto p-3 bg-orange-100 dark:bg-orange-900 rounded-full w-fit mb-4">
                <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>CSV Import</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Bulk upload meter readings via CSV files for efficient data management.</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack Section */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Built with Modern Technology</CardTitle>
            <CardDescription>Full-stack application using industry-standard tools and frameworks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="font-semibold text-lg mb-2">Frontend</h3>
                <p className="text-sm text-muted-foreground">React, Next.js, TypeScript, Tailwind CSS, Recharts</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Backend</h3>
                <p className="text-sm text-muted-foreground">Java Spring Boot 3, Spring Security, JWT, JPA</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Database & Payments</h3>
                <p className="text-sm text-muted-foreground">PostgreSQL, Stripe Checkout, Webhook Integration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Architecture Overview */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">System Architecture</CardTitle>
            <CardDescription>Microservices architecture with secure API communication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">React Frontend</h4>
                <p className="text-sm text-muted-foreground">User Interface & Dashboard</p>
              </div>
              <div className="text-2xl text-muted-foreground">→</div>
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">Spring Boot API</h4>
                <p className="text-sm text-muted-foreground">Business Logic & Authentication</p>
              </div>
              <div className="text-2xl text-muted-foreground">→</div>
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">PostgreSQL</h4>
                <p className="text-sm text-muted-foreground">Data Storage & Management</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
