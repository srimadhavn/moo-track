import { NextResponse } from "next/server"
import { getHerdData } from "@/lib/api"

export async function GET() {
  try {
    const herdData = await getHerdData()
    return NextResponse.json(herdData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch herd data" }, { status: 500 })
  }
}

