import Campaigns from "@/components/campaigns"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schemes & Subsidies - Moo Track Dashboard",
  description: "Government initiatives for indigenous cattle development",
}

export default function SchemesPage() {
  return <Campaigns />
}

