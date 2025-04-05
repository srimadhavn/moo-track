import HerdOverview from "@/components/herd-overview"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - Moo Track Dashboard",
  description: "Monitor your cattle inventory by breed",
}

export default function DashboardPage() {
  return <HerdOverview />
}

