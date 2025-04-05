import { NextResponse } from "next/server"
import { getCowList } from "@/lib/api"

export async function GET() {
  try {
    const cows = await getCowList()
    return NextResponse.json(cows)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cows" }, { status: 500 })
  }
}

