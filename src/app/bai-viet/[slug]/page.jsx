import "react-quill/dist/quill.bubble.css";
import { getPostDetail } from "@/libs/prisma";
import FamousPost from "@/components/famousPost";
const PostDetail = async ({ params }) => {
  const { slug } = params;
  const data = await getPostDetail(slug);
  return (
    <main className="max-w-screen-xl block mx-auto px-3">
      <div className="flex items-start gap-4 md:my-6 my-3 md:flex-row flex-col">
        <div className="md:flex-[1_1_70%] w-full  rounded-md">
          <h1 className="md:text-4xl text-2xl font-bold my-5 ml-3  ">
            {data.tieude}
          </h1>
          <div
            className="view ql-editor"
            dangerouslySetInnerHTML={{ __html: data?.noidung }}
          />
        </div>
        <div className="md:flex-[1_1_30%] w-full">
          <FamousPost />
        </div>
      </div>
    </main>
  );
};

export default PostDetail;
