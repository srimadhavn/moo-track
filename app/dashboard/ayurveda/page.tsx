import AyurvedaCare from "@/components/ayurveda-care"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ayurveda Care - Moo Track Dashboard",
  description: "Traditional natural remedies for indigenous cattle",
}

export default function AyurvedaPage() {
  return <AyurvedaCare />
}

