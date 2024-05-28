import { NextResponse } from "next/server";
import Project, { validateProject } from '../model/Project';
import connectDB from "@/app/api/utility/connectDB";
import dbConnect from "@/app/api/utility/dbConnect";
import useConnect from "@/app/api/utility/useConnect";




export async function GET() {
    await dbConnect();

    try {
        const projects = await Project.find();
        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}



