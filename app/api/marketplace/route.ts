import { NextResponse } from "next/server"
import { getMarketplaceListings } from "@/lib/api"

export async function GET() {
  try {
    const listings = await getMarketplaceListings()
    return NextResponse.json(listings)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch marketplace listings" }, { status: 500 })
  }
}

