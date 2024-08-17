import { getPostDetail, getCategory } from "@/libs/prisma";
import FormEditPost from "./formPage1";
import { auth } from "@/utils/auth";
import { LOGIN } from "@/libs/routes";
const Edit = async ({ params }) => {
  const { slug } = params;
  const data = await getPostDetail(slug);
  const category = await getCategory();
  const session = await auth();
  const loggedInUser = session?.user;
  if (!loggedInUser) redirect(LOGIN);
  return <FormEditPost category={category} data={data} />;
};

export default Edit;
