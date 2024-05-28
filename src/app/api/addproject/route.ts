import { NextResponse } from "next/server";
import Project, { validateProject } from "../model/Project";

export async function POST(request: Request, context: any) {
    // await connectDB();
    const requestData = await request.json();
    console.log(requestData)
    if(validateProject(requestData)){
        try {
            const newProject = await new Project(requestData);
            await newProject.save();
            return NextResponse.json({ success: true, data: newProject });
        } catch (error) {
            console.log(error)
            return NextResponse.json({ success: false, error: 'Server Error', "message": error }, { status: 500 });
        }
    }else{
        return NextResponse.json({ success: false, error: 'wrong datao or format seneded,Server Error' }, { status: 200 });
    }    
    
}
