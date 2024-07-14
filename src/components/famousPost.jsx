import Image from "next/image";
import Heading from "./heading";
import { getTopPost } from "@/libs/prisma";
import Link from "next/link";
const FamousPost = async () => {
  const topPost = await getTopPost();
  return (
    <>
      <Heading
        cName={
          "border-b-2 border-blue-500 mb-3 md:text-2xl text-lg font-bold text-gray-800"
        }
      >
        <h2 className="capitalize">tin tức hot</h2>
      </Heading>
      <div className="flex flex-col gap-2">
        {topPost &&
          topPost.map((item) => (
            <Link
              href={`/bai-viet/${item.slug}`}
              className="group w-full flex items-start gap-2"
              key={item.id}
            >
              <Image
                src={item.hinhanh}
                alt="img"
                width={180}
                height={180}
                className="w-[40%] h-auto "
              />
              <h6 className="group-hover:text-blue-500 text-gray-950 md:text-base text-sm leading-3 ">
                {item.tieude}
              </h6>
            </Link>
          ))}
      </div>
    </>
  );
};

export default FamousPost;
