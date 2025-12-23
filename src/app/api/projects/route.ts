import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { uploadImage } from "@/lib/cloudinary";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find();
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

    const title = formData.get("title") as string;
    const client = formData.get("client") as string;
    const description = formData.get("description") as string;
    const industryName = formData.get("industryName") as string;
    const companyName = formData.get("companyName") as string;
    const solution = formData.get("solution") as string;
    const challengesRaw = formData.getAll("challenges[]") as string[];

    if (
      !title ||
      !client ||
      !description ||
      !industryName ||
      !companyName ||
      !solution
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
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

    const imageFiles = formData.getAll("images") as File[];
    if (!imageFiles.length) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return uploadImage(buffer, "smit_shah");
      })
    );

    const project = new Project({
      title,
      client,
      description,
      images: imageUrls,
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
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add project" },
      { status: 500 }
    );
  }
}
