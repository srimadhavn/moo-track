import Marketplace from "@/components/marketplace"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marketplace - Moo Track Dashboard",
  description: "Buy and sell cattle and genetic material",
}

export default function MarketplacePage() {
  return <Marketplace />
}

