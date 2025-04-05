import { NextResponse } from "next/server"
import { getHealthAlerts } from "@/lib/api"

export async function GET() {
  try {
    const alerts = await getHealthAlerts()
    return NextResponse.json(alerts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch health alerts" }, { status: 500 })
  }
}

