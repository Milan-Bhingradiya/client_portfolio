import { NextResponse } from "next/server";
import connectDB from "@/app/api/utility/connectDB";
import Project from "../../model/Project";


export async function GET(request: Request, context: any) {
    // await connectDB();
    let { projectId } = context.params;
    console.log("project id : ", projectId);
    try {
        const projects = await Project.findById(projectId.toString());
        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'wrong id ,Server Error' }, { status: 500 });
    }
}


export async function post(request: Request, context: any) {
    // await connectDB();
    console.log(request)
    let { projectId } = context.params;
    console.log("project id : ", projectId);
    try {
        const projects = await Project.findById(projectId.toString());
        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'wrong id ,Server Error' }, { status: 500 });
    }
}
