import Link from "next/link";
import Heading from "./heading";
import { getCategory } from "@/libs/prisma";

const bgGradient = [
  "bg-gradient-to-br from-purple-500 to-indigo-500",
  "bg-gradient-to-br from-purple-500 to-cyan-500",
  "bg-gradient-to-br from-fuchsia-500 to-pink-500",
  "bg-gradient-to-br from-rose-500 to-violet-500",
  "bg-gradient-to-br from-pink-500 to-purple-500",
  "bg-gradient-to-br from-rose-500 to-violet-500",
];

const Category = async () => {
  const posts = await getCategory();
  return (
    <>
      <Heading
        cName={
          "border-b-2 border-blue-500 mb-3 md:text-2xl text-lg font-bold text-gray-800"
        }
      >
        <h2 className="capitalize">Danh mục</h2>
      </Heading>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-3 pt-4 mb-8">
        {posts?.map((item, i) => (
          <Link
            href={"#"}
            key={item.id}
            className={`${bgGradient[i]} hover:opacity-80 cursor-pointer md:text-2xl text-xl text-white font-bold text-center py-10 w-auto rounded-md bg-rose-500 `}
          >
            {item.tieude}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Category;
