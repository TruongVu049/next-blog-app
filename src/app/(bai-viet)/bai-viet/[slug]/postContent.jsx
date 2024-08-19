import "react-quill/dist/quill.bubble.css";
import "./style.css";
import PostWidget from "@/components/post/postWidget";

import Image from "next/image";
import Comment from "@/components/comment";
import { Suspense } from "react";
import { auth } from "@/utils/auth";
import Social from "@/components/social";
const PostContent = async ({ post }) => {
  const session = await auth();
  const loggedInUser = session?.user;
  return (
    <div className="flex md:flex-row flex-col gap-5 relative">
      <div className="md:flex-[1_1_70%] w-full  rounded-md">
        <h1 className="md:text-4xl text-2xl font-bold my-5 ml-3  ">
          {post.title}
        </h1>
        <div className="overflow-hidden mx-3">
          <div className="w-full  flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                width={50}
                height={50}
                alt="avatar"
                src={post.user["image"]}
                className="rounded-full"
              />
              <div className="flex flex-col justify-between">
                <h6 className="md:text-lg text-base text-gray-800 font-semibold">
                  {post.user["name"]}
                </h6>
                <span>{new Date(post?.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-2 px-3">
          <Suspense fallback={null}>
            <Social slug={post.slug} content={post.content} />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <div
            className="content view ql-editor "
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Comment user={loggedInUser} postid={post.id} />
        </Suspense>
      </div>
      <div className="w-1 hidden md:block border-r border-neutral-200"></div>
      <div className="relative md:sticky top-2 left-0 right-0 flex-2 md:w-64 lg:w-72 h-fit flex flex-col gap-10">
        <Suspense fallback={null}>
          <PostWidget slug={post.slug} categoryID={post.id_category} />
        </Suspense>
      </div>
    </div>
  );
};

export default PostContent;
