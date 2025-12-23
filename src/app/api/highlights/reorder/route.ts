import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Highlight from "@/models/Highlight";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { highlights } = await request.json();

    // Update order for each highlight
    const updatePromises = highlights.map(
      (item: { id: string; order: number }) =>
        Highlight.findByIdAndUpdate(item.id, { order: item.order })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("PUT /api/highlights/reorder error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
