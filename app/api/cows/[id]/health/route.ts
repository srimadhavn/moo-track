import { NextResponse } from "next/server"
import { getCowHealthData } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const cowId = params.id
    const healthData = await getCowHealthData(cowId)

    if (!healthData) {
      return NextResponse.json({ error: "Cow not found" }, { status: 404 })
    }

    return NextResponse.json(healthData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cow health data" }, { status: 500 })
  }
}

