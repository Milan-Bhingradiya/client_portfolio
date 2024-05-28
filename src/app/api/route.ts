import dbConnect from "./utility/dbConnect";
import Project from "./model/Project";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const newProject = await new Project({
    title: 'mm My New 3 Project',
    desc: 'A description of the project.',
    work: ['Task 1', 'Task 2'],
    scopeOfWorkLine: 'A summary of the project\'s scope of work.',
    scopeOfWork: ['Deliverable 1', 'Deliverable 2'],
    projectGoalLine: 'The main goal of the project.',
    projectGoal: ['Increase user engagement', 'Improve conversion rate'],
    screens: 'Wireframes for the project screens.',
  });

  // await newProject.save();
  return NextResponse.json({ "x": "X" })
}


export async function POST(request: Request) {
  const reqdata = await request.json();
  return NextResponse.json({
    "x": {
      "post": "POST",
      "data": reqdata
    }
  })
}