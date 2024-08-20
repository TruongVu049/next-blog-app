import { getPostDetail, getCategories } from "@/libs/prisma";
import FormEditPost from "./formPage1";
import { auth } from "@/utils/auth";
import { LOGIN } from "@/libs/routes";
const Edit = async ({ params }) => {
  const session = await auth();
  const loggedInUser = session?.user;
  if (!loggedInUser) redirect(LOGIN);
  const { slug } = params;
  const post = await getPostDetail(slug);
  const category = await getCategories();
  return <FormEditPost category={category} post={post} />;
};

export default Edit;
