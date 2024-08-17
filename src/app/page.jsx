// import Featured from "@/components/featured";
// import Category from "@/components/category";
// import Footer from "@/components/footer";
// import CartList from "@/components/cartList";
// import { getToTalPagePosts } from "@/libs/prisma";
import PostCard from "@/components/postCard";
import PostWidget from "@/components/postWidget";
import { getPostsView } from "@/libs/prisma";
const limit = 10;

export default async function Home({ searchParams }) {
  // const currentPage = parseInt(searchParams?.page) || 1;
  // const totalPages = await getToTalP agePosts("", limit);
  const posts = await getPostsView();
  return (
    <main className="max-w-screen-xl block mx-auto px-3 mt-4">
      <div className="flex md:flex-row flex-col gap-5 relative">
        <div className="flex-1 grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-y-8 lg:gap-4">
          {posts.length
            ? posts.map((post) => <PostCard post={post} key={post.id} />)
            : null}
        </div>
        <div className="w-1 hidden md:block border-r border-neutral-200"></div>

        <div className="relative md:sticky top-2 left-0 right-0 flex-2 md:w-64 lg:w-72 h-fit flex flex-col gap-10">
          <PostWidget />
        </div>
      </div>
    </main>
  );
}
