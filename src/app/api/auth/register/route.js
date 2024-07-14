import { NextResponse } from "next/server";
import { register } from "@/libs/prisma";
export async function POST(request) {
  try {
    const formData = await request.json();
    const response = await register(formData);
  } catch (e) {
    return NextResponse.json({ message: "error" });
  }
  return NextResponse.json({ message: "success" });
}
