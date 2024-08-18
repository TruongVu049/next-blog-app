import { getPostsWithParams, getToTalPagePosts } from "@/libs/prisma";
import PostList from "@/components/post/postList.jsx";
import { Suspense } from "react";
import Pagination from "@/components/pagination";

export const metadata = {
  title: "Tìm kiếm",
  description: "Tìm kiếm bài viết",
};

const limit = 20;

const SearchPage = async ({ searchParams }) => {
  const search = searchParams?.q || "";
  const currentPage = parseInt(searchParams?.page) || 1;
  const totalPages = await getToTalPagePosts(search, limit);
  const posts = await getPostsWithParams(currentPage, limit, search);

  return (
    <main className="max-w-screen-xl block mx-auto px-3">
      <h2 className="md:text-2xl text-gray-700 text-xl font-semibold py-10">
        Kết quả cho <strong className="text-gray-950"> {search}</strong>
      </h2>
      <div className="flex-1 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 lg:gap-y-8 lg:gap-4">
        <Suspense fallback={null}>
          <PostList posts={posts} />
        </Suspense>
      </div>
      <div className="mb-5">
        <Suspense fallback={null}>
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </Suspense>
        <div className="clear-both"></div>
      </div>
    </main>
  );
};

export default SearchPage;
