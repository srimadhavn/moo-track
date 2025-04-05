import { NextResponse } from "next/server"
import { getMilkYieldData } from "@/lib/api"

export async function GET() {
  try {
    const milkYieldData = await getMilkYieldData()
    return NextResponse.json(milkYieldData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch milk yield data" }, { status: 500 })
  }
}

