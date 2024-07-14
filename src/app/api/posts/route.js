import { NextResponse } from "next/server";
import { createPost } from "@/libs/prisma";
export async function POST(request) {
  try {
    const formData = await request.json();
    const res = await createPost(formData);
    return new NextResponse(JSON.stringify({ res }, { status: 200 }));
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}
