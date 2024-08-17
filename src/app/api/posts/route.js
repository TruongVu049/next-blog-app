import { NextResponse } from "next/server";
import {
  createPost,
  updatePost,
  getRecentPosts,
  getSimilarPosts,
} from "@/libs/prisma";
export async function POST(request) {
  try {
    const formData = await request.json();
    let res;
    if (formData?.id) {
      res = await updatePost(formData);
    } else {
      res = await createPost(formData);
    }
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
    const slug = searchParams.get("slug");
    let res;
    if (slug) {
      res = await getSimilarPosts(slug, searchParams.get("categoryid"));
    } else {
      res = await getRecentPosts();
    }
    return new NextResponse(JSON.stringify({ res }, { status: 200 }));
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 404 })
    );
  }
}
