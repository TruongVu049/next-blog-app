import { getPostsByCategory, getToTalPagePostsByCategory } from "@/libs/prisma";
import { genPageMetadata } from "@/app/seo";
import { PostCardSkeleton } from "@/components/post/postCard";
import Pagination from "@/components/pagination";
import PostList from "@/components/post/postList";
import { Suspense } from "react";

export const metadata = genPageMetadata({ title: "Danh mục bài viết" });

const limit = 9;

export default async function CategoryPage({ params, searchParams }) {
  const currentPage = parseInt(searchParams?.page) || 1;
  const totalPages = await getToTalPagePostsByCategory(params.slug, limit);
  const posts = await getPostsByCategory(params.slug, currentPage, limit);

  return (
    <main className="max-w-screen-xl block mx-auto px-3 mt-4">
      <div className="flex-1 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 lg:gap-y-8 lg:gap-4">
        <Suspense
          fallback={new Array(3).fill(null).map((item, index) => (
            <PostCardSkeleton key={`skeloton-${index}`} />
          ))}
        >
          <PostList posts={posts} />
        </Suspense>
      </div>
      <div className="mb-5 mt-3">
        <Suspense fallback={null}>
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </Suspense>
        <div className="clear-both"></div>
      </div>
    </main>
  );
}
