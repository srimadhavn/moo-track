import GaushalaAdoption from "@/components/gaushala-adoption"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gaushala Adoption - Moo Track Dashboard",
  description: "Support and adopt indigenous cows for conservation",
}

export default function GaushalaPage() {
  return <GaushalaAdoption />
}

