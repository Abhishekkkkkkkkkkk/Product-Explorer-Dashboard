import { NextResponse } from "next/server"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${params.id}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch product" },
        { status: 500 }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: "Upstream API error" },
      { status: 500 }
    )
  }
}
