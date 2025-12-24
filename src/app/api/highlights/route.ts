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
    const imageDesktopFile = formData.get("imageDesktop") as File | null;
    const imageMobileFile = formData.get("imageMobile") as File | null;
    const order = parseInt(formData.get("order") as string) || 0;

    if (!title || !subtitle) {
      return NextResponse.json(
        { error: "Title and subtitle are required" },
        { status: 400 }
      );
    }

    if (!imageDesktopFile || !imageMobileFile) {
      return NextResponse.json(
        { error: "Both desktop and mobile images are required" },
        { status: 400 }
      );
    }

    // Upload desktop image (horizontal/landscape)
    const desktopBuffer = Buffer.from(await imageDesktopFile.arrayBuffer());
    const imageDesktopUrl = await uploadImage(
      desktopBuffer,
      "smit_shah_highlights"
    );

    // Upload mobile image (vertical/portrait)
    const mobileBuffer = Buffer.from(await imageMobileFile.arrayBuffer());
    const imageMobileUrl = await uploadImage(
      mobileBuffer,
      "smit_shah_highlights"
    );

    const highlight = new Highlight({
      imageDesktop: imageDesktopUrl,
      imageMobile: imageMobileUrl,
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
