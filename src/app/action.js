"use server";
import { signIn, signOut } from "@/utils/auth";
import { revalidatePath } from "next/cache";

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData) {
  try {
    const res = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
    revalidatePath("/");
    return res;
  } catch (err) {
    throw err;
  }
}
