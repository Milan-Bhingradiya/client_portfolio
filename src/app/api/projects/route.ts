import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { uploadImage } from "@/lib/cloudinary";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch projects";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const formData = await request.formData();

    // Get text fields
    const title = formData.get("title") as string;
    const client = formData.get("client") as string;
    const description = formData.get("description") as string;
    const industryName = formData.get("industryName") as string;
    const companyName = formData.get("companyName") as string;
    const solution = formData.get("solution") as string;
    const challengesRaw = formData.getAll("challenges[]") as string[];

    // Validate required text fields
    if (
      !title ||
      !client ||
      !description ||
      !industryName ||
      !companyName ||
      !solution
    ) {
      return NextResponse.json(
        { error: "All text fields are required" },
        { status: 400 }
      );
    }

    const challenges = challengesRaw.filter(Boolean);
    if (!challenges.length) {
      return NextResponse.json(
        { error: "At least one challenge is required" },
        { status: 400 }
      );
    }

    // Get image files
    const thumbnailFile = formData.get("thumbnail") as File | null;
    const heroImageFile = formData.get("heroImage") as File | null;
    const squareImageFiles = formData.getAll("squareImages") as File[];
    const galleryImageFiles = formData.getAll("galleryImages") as File[];

    // Validate required images
    if (!thumbnailFile || thumbnailFile.size === 0) {
      return NextResponse.json(
        { error: "Thumbnail image is required (400×500 portrait)" },
        { status: 400 }
      );
    }

    if (!heroImageFile || heroImageFile.size === 0) {
      return NextResponse.json(
        { error: "Hero image is required (1920×1080 horizontal)" },
        { status: 400 }
      );
    }

    // Filter valid square images
    const validSquareImages = squareImageFiles.filter((f) => f.size > 0);
    if (validSquareImages.length !== 2) {
      return NextResponse.json(
        { error: "Exactly 2 square images are required (800×800)" },
        { status: 400 }
      );
    }

    // Upload thumbnail
    const thumbBuffer = Buffer.from(await thumbnailFile.arrayBuffer());
    const thumbnailUrl = await uploadImage(thumbBuffer, "smit_shah_projects");

    // Upload hero image
    const heroBuffer = Buffer.from(await heroImageFile.arrayBuffer());
    const heroImageUrl = await uploadImage(heroBuffer, "smit_shah_projects");

    // Upload square images (exactly 2)
    const squareImageUrls = await Promise.all(
      validSquareImages.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return uploadImage(buffer, "smit_shah_projects");
      })
    );

    // Upload gallery images
    const galleryImageUrls = await Promise.all(
      galleryImageFiles
        .filter((file) => file.size > 0)
        .map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          return uploadImage(buffer, "smit_shah_projects");
        })
    );

    const project = new Project({
      title,
      client,
      description,
      thumbnail: thumbnailUrl,
      heroImage: heroImageUrl,
      squareImages: squareImageUrls,
      galleryImages: galleryImageUrls,
      industryName,
      companyName,
      solution,
      challenges,
    });
    
    await project.save();

    return NextResponse.json({
      message: "Project added successfully",
      project,
    });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to add project" },
      { status: 500 }
    );
  }
}
