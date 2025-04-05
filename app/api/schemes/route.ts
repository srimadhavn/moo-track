import { NextResponse } from "next/server"
import { getSchemes } from "@/lib/api"

export async function GET() {
  try {
    const schemes = await getSchemes()
    return NextResponse.json(schemes)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch schemes" }, { status: 500 })
  }
}

