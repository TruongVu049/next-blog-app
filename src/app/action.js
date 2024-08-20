"use server";
import { signIn, signOut } from "@/utils/auth";
import { revalidatePath } from "next/cache";
import { removePost } from "@/libs/prisma";
export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/", redirect: true });
}

export async function doCredentialLogin(formData) {
  try {
    for (let i = 0; i < 100000; i++) {}
    const res = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
    revalidatePath("/");
    return {
      message: "OK",
    };
  } catch (err) {
    return {
      message: err,
    };
  }
}

export async function doRemovePost(formData) {
  try {
    const postid = formData.get("postid");
    const post = await removePost(postid);
    revalidatePath("/");
  } catch (err) {
    console.log(err);
  }
}
