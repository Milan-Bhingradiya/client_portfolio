import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import HomeProjects from "@/models/HomeProjects";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectDB();
    const homeProjects = await HomeProjects.findOne();
    if (!homeProjects) {
      return NextResponse.json({ projects: [] });
    }

    const ids = [homeProjects.project1, homeProjects.project2, homeProjects.project3];
    const projects = await Project.find({ _id: { $in: ids } });
    
    const ordered = ids
      .map((id) => projects.find((p: any) => p._id && p._id.toString() === id))
      .filter(Boolean);

    return NextResponse.json({ projects: ordered });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch home projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { project1, project2, project3 } = await request.json();

    if (!project1 || !project2 || !project3) {
      return NextResponse.json(
        { error: "Provide project1, project2, and project3 IDs" },
        { status: 400 }
      );
    }

    const homeProjects = await HomeProjects.findOneAndUpdate(
      {},
      { project1, project2, project3 },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Home projects set successfully", homeProjects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to set home projects" }, { status: 500 });
  }
}

