import HealthTracking from "@/components/health-tracking"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Health Tracking - Moo Track Dashboard",
  description: "Real-time IoT sensor data monitoring",
}

export default function HealthPage() {
  return <HealthTracking />
}

