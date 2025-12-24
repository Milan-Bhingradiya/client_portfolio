import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("GET /api/messages error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { fullName, companyName, phone, email, message, source } =
      await request.json();

    // Validate required fields
    if (!fullName || !companyName || !email || !message) {
      return NextResponse.json(
        { error: "Full name, company name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const newMessage = new Message({
      fullName,
      companyName,
      phone: phone || "",
      email,
      message,
      source: source || "contact",
    });
    await newMessage.save();

    return NextResponse.json({
      message: "Message received successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("POST /api/messages error:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
