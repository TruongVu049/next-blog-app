import { Suspense } from "react";
import { getTopViewedPosts } from "@/libs/prisma";
import PostWidget from "@/components/post/postWidget";
import PostList from "@/components/post/postList";
import { PostCardSkeleton } from "@/components/post/postCard";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function Home({ searchParams }) {
  const posts = await getTopViewedPosts();
  return (
    <main className="max-w-screen-xl block mx-auto px-3 mt-4">
      <div className="flex md:flex-row flex-col gap-5 relative">
        <div className="flex-1">
          <div className="flex-1 grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-y-8 lg:gap-4">
            <Suspense
              fallback={new Array(4).fill(null).map((item, index) => (
                <PostCardSkeleton key={`skeloton-${index}`} />
              ))}
            >
              <PostList posts={posts} />
            </Suspense>
          </div>
          <div className="flex justify-center mt-5 mb-10">
            <Link
              href={"/tim-kiem/all"}
              className="flex items-center gap-2 hover:opacity-70 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full px-4 py-2 text-white"
            >
              Xem thêm{" "}
              <ArrowLongRightIcon className="inline-block animate-bouncex ease-in-out  w-6 h-6 text-white" />
            </Link>
          </div>
        </div>
        <div className="w-1 hidden md:block border-r border-neutral-200"></div>
        <div className="relative top-2 left-0 right-0 flex-2 md:w-64 lg:w-72 h-fit flex flex-col gap-10">
          <div className="bg-[#f7f7f7] text-[#1d1e20] p-3">
            <h2 className="mb-3 pb-3 text-sm font-semibold border-b border-[#d4d4d4] text-gray-700">
              Các bài viết gần đây
            </h2>
            <div>
              <Suspense
                fallback={new Array(3).fill(null).map((item, index) => (
                  <div key={index} className="flex items-center gap-1 pb-2">
                    <div className="rounded-full w-10 h-10 nimate-pulse bg-gray-200"></div>
                    <div className="w-full">
                      <div className="rounded w-full h-8 nimate-pulse bg-gray-200"></div>
                      <div className="rounded mt-1 w-14 h-4 nimate-pulse bg-gray-200"></div>
                    </div>
                  </div>
                ))}
              >
                <PostWidget />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
