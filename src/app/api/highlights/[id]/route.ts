import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Highlight from "@/models/Highlight";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const highlight = await Highlight.findById(params.id);
    if (!highlight) {
      return NextResponse.json(
        { error: "Highlight not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ highlight });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch highlight" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, subtitle, order, isActive } = body;

    const highlight = await Highlight.findByIdAndUpdate(
      params.id,
      { title, subtitle, order, isActive },
      { new: true }
    );

    if (!highlight) {
      return NextResponse.json(
        { error: "Highlight not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Highlight updated", highlight });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update highlight" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const highlight = await Highlight.findByIdAndDelete(params.id);
    if (!highlight) {
      return NextResponse.json(
        { error: "Highlight not found" },
        { status: 404 }
      );
    }

    // Delete images from Cloudinary
    if (highlight.imageDesktop) {
      await deleteImage(highlight.imageDesktop);
    }
    if (highlight.imageMobile) {
      await deleteImage(highlight.imageMobile);
    }

    return NextResponse.json({ message: "Highlight deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete highlight" },
      { status: 500 }
    );
  }
}
