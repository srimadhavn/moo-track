import FinancialAnalytics from "@/components/financial-analytics"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Financial Analytics - Moo Track Dashboard",
  description: "Track your farm's financial performance and productivity",
}

export default function FinancialPage() {
  return <FinancialAnalytics />
}

