import { NextResponse } from "next/server";
import Project from "../../model/Project";

export async function GET(request: Request, context: any) {
    // await connectDB();
    let { userId } = context.params;
    console.log("project id : ", userId);
    try {
        const projects = await Project.findById(userId.toString());
        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'wrong id ,Server Error' }, { status: 500 });
    }
}

