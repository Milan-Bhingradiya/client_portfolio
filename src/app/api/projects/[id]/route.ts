import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const project = await Project.findById(params.id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, client, description, industryName, companyName, solution, challenges } = body;

    const project = await Project.findByIdAndUpdate(
      params.id,
      {
        title,
        client,
        description,
        industryName,
        companyName,
        solution,
        challenges: Array.isArray(challenges) ? challenges : [challenges],
      },
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project updated", project });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const project = await Project.findByIdAndDelete(params.id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Delete images from Cloudinary
    const imagesToDelete: string[] = [];
    if (project.thumbnail) imagesToDelete.push(project.thumbnail);
    if (project.heroImage) imagesToDelete.push(project.heroImage);
    if (project.squareImages) imagesToDelete.push(...project.squareImages);
    if (project.galleryImages) imagesToDelete.push(...project.galleryImages);
    
    await Promise.all(imagesToDelete.map((url: string) => deleteImage(url)));

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

