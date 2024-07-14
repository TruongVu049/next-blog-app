import { getToTalPagePosts } from "@/libs/prisma";
import CartList from "@/components/cartList";
const limit = 10;
const SearchPage = async ({ searchParams }) => {
  const search = searchParams?.s || "";
  const currentPage = parseInt(searchParams?.page) || 1;
  const totalPages = await getToTalPagePosts(search, limit);
  return (
    <main className="max-w-screen-xl block mx-auto px-3">
      <h2 className="md:text-2xl text-gray-700 text-xl font-semibold py-10">
        Kết quả cho <strong className="text-gray-950"> {search}</strong>
      </h2>
      <CartList
        currentPage={currentPage}
        totalPages={totalPages}
        limit={limit}
        search={search}
      />
    </main>
  );
};

export default SearchPage;
