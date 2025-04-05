import type React from "react"
import DashboardNav from "@/components/dashboard-nav"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - Moo Track",
  description: "Advanced desi cattle management for Indian farmers",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-4 md:py-6 space-y-6 md:space-y-8 px-2 md:px-4">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Moo Track</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Advanced desi cattle management for Indian farmers
            </p>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 p-2 rounded-lg">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs md:text-sm font-medium">IoT System Active</span>
          </div>
        </header>

        <DashboardNav />

        <main>{children}</main>
      </div>
    </div>
  )
}

