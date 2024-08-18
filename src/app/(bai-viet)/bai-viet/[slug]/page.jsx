import "react-quill/dist/quill.bubble.css";
import "./style.css";
import { getPostDetail } from "@/libs/prisma";
import Image from "next/image";
import Comment from "@/components/comment";
import { auth } from "@/utils/auth";
import PostWidget from "@/components/postWidget";
import { HeartIcon } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export async function generateMetadata({ params }) {
  const post = await getPostDetail(params.slug);
  if (!post) {
    return;
  }
  const authors = post?.user?.name || "default";
  const date = new Date(Date.parse("2024-08-17T08:36:29.926Z"));
  const publishedAt = date.toISOString();
  const modifiedAt = date.toISOString();
  const ogImages = [
    {
      url: post.image,
    },
  ];
  return {
    title: post.title,
    description: post.content,
    robots: {
      index: post.title,
      follow: post.title,
      googleBot: {
        index: post.title,
        follow: post.title,
      },
    },
    openGraph: {
      title: post.title,
      description: post.content,
      siteName: "vnblog Chia Sẻ Kiến Thức - Blog Đa Lĩnh Vực",
      locale: "vi_VN",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: "./",
      images: ogImages,
      authors: authors.length > 0 ? authors : ["Truong Vu"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content,
      images: [ogImages],
    },
  };
}

export default async function PostDetail({ params }) {
  const { slug } = params;
  const post = await getPostDetail(slug);
  if (!post) return notFound();

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "Post",
    name: post.title,
    description: post.description,
    image: post.image,
  };
  const session = await auth();
  const loggedInUser = session?.user;

  return (
    <main className="max-w-screen-xl block mx-auto px-3 mt-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(postJsonLd),
        }}
      />
      <div className="flex md:flex-row flex-col gap-5 relative">
        <div className="md:flex-[1_1_70%] w-full  rounded-md">
          <h1 className="md:text-4xl text-2xl font-bold my-5 ml-3  ">
            {post.title}
          </h1>
          <div className="overflow-hidden flex items-center gap-4 cursor-pointer mx-3">
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
            <HeartIcon className="w-8 h-8 text-gray-700 hover:text-rose-500" />
          </div>
          <div
            className="content view ql-editor"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
          <Comment user={loggedInUser} postid={post.id} />
        </div>
        <div className="w-1 hidden md:block border-r border-neutral-200"></div>
        <div className="relative md:sticky top-2 left-0 right-0 flex-2 md:w-64 lg:w-72 h-fit flex flex-col gap-10">
          <PostWidget slug={post.slug} categoryID={post.id_category} />
        </div>
      </div>
    </main>
  );
}
