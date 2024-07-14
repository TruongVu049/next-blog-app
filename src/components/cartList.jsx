import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/libs/prisma";
import Pagination from "./pagination";

const CartList = async ({ currentPage, totalPages, limit, search = "" }) => {
  const posts = await getPosts(currentPage, limit, search);

  return (
    <div className="mb-5">
      <div className="min-h-72">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4  border-t border-gray-300 py-4 ">
          {posts &&
            posts.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer rounded-md shadow-md border border-gray-200 bg-white p-2"
              >
                <Link href={`/bai-viet/${item.slug}`}>
                  <div className="overflow-hidden rounded-md shadow-sm">
                    <Image
                      width={200}
                      height={200}
                      alt="image"
                      src={item.hinhanh}
                      className="group-hover:scale-105 transform transition duration-y overflow-hidden h-auto w-full"
                    />
                  </div>
                  <h4 className="group-hover:text-blue-600 md:text-lg text-base font-semibold pt-2  ">
                    {item.tieude}
                  </h4>
                </Link>
              </div>
            ))}
        </div>
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
      <div className="clear-both"></div>
    </div>
  );
};

export default CartList;
