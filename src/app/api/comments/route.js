import { NextResponse } from "next/server";
import { getComments, createComment } from "@/libs/prisma";

export async function POST(request) {
  try {
    const comment = await request.json();
    const res = await createComment(comment);
    return new NextResponse(JSON.stringify({ res }, { status: 200 }));
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get("postid");
    let res = await getComments(parseInt(postId));
    return new NextResponse(JSON.stringify({ res }, { status: 200 }));
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}
