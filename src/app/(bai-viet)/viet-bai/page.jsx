import { redirect } from "next/navigation";
import FormWriteBlog from "./formPage";
import { getCategories } from "@/libs/prisma";
import { auth } from "@/utils/auth";
import { LOGIN } from "@/libs/routes";
const WriteBlog = async () => {
  const session = await auth();
  const loggedInUser = session?.user;
  if (!loggedInUser) redirect(LOGIN);
  const category = await getCategories();
  return (
    <FormWriteBlog
      userId={loggedInUser?.id}
      category={category}
    ></FormWriteBlog>
  );
};

export default WriteBlog;
