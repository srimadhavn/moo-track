import BreedingPredictor from "@/components/breeding-predictor"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Breeding - Moo Track Dashboard",
  description: "Optimize breeding with AI-powered predictions",
}

export default function BreedingPage() {
  return <BreedingPredictor />
}

