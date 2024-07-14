import Featured from "@/components/featured";
import Category from "@/components/category";
import Footer from "@/components/footer";
import CartList from "@/components/cartList";
import { getToTalPagePosts } from "@/libs/prisma";

const limit = 10;

export default async function Home({ searchParams }) {
  const currentPage = parseInt(searchParams?.page) || 1;
  const totalPages = await getToTalPagePosts("", limit);

  return (
    <main className="max-w-screen-xl block mx-auto px-3">
      <Featured />
      <Category />
      <CartList
        currentPage={currentPage}
        totalPages={totalPages}
        limit={limit}
      />
      <Footer />
    </main>
  );
}
