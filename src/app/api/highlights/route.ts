import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Highlight from "@/models/Highlight";
import { uploadImage } from "@/lib/cloudinary";

export async function GET() {
  try {
    await connectDB();
    const highlights = await Highlight.find({ isActive: true }).sort({
      order: 1,
    });
    return NextResponse.json({ highlights });
  } catch (error) {
    console.error("GET /api/highlights error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch highlights";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const imageFile = formData.get("image") as File | null;
    const order = parseInt(formData.get("order") as string) || 0;

    if (!title || !subtitle) {
      return NextResponse.json(
        { error: "Title and subtitle are required" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadImage(buffer, "smit_shah_highlights");
    } else {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const highlight = new Highlight({
      image: imageUrl,
      title,
      subtitle,
      order,
      isActive: true,
    });
    await highlight.save();

    return NextResponse.json({
      message: "Highlight added successfully",
      highlight,
    });
  } catch (error) {
    console.error("POST /api/highlights error:", error);
    return NextResponse.json(
      { error: "Failed to add highlight" },
      { status: 500 }
    );
  }
}
