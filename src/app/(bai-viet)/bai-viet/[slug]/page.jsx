import { getPostDetail } from "@/libs/prisma";
import { notFound } from "next/navigation";
import PostContent from "./postContent";
import { Suspense } from "react";
import { removeHTMLTags } from "@/helpers/utils";
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
    description: removeHTMLTags(post.content),
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
      description: removeHTMLTags(post.content),
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
      description: removeHTMLTags(post.content),
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

  return (
    <main className="max-w-screen-xl block mx-auto px-3 mt-4 ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(postJsonLd),
        }}
      />
      <Suspense fallback={null}>
        <PostContent post={post} />
      </Suspense>
    </main>
  );
}
