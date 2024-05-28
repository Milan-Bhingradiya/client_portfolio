import { NextResponse } from "next/server";
import connectDB from "@/app/api/utility/connectDB";
import Project from "../../model/Project";
import dbConnect from "../../utility/dbConnect";


export async function GET(request: Request, context: any) {
    
    let { projectId } = context.params;
    console.log("project id : ", projectId);
    try {
        const projects = await Project.findById(projectId.toString());
        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'wrong id ,Server Error' }, { status: 500 });
    }
}


export async function POST(request: Request, context: any) {
//   await  dbConnect();
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
