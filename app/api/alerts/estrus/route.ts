import { NextResponse } from "next/server"
import { getEstrusAlerts } from "@/lib/api"

export async function GET() {
  try {
    const alerts = await getEstrusAlerts()
    return NextResponse.json(alerts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch estrus alerts" }, { status: 500 })
  }
}

