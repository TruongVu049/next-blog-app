import Image from "next/image";
import { getLatestPost } from "@/libs/prisma";
import Link from "next/link";
import FamousPost from "./famousPost";
const Featured = async () => {
  const latestPost = await getLatestPost();
  return (
    <div className="flex items-start gap-4 md:my-6 my-3 md:flex-row flex-col pt-[8px]">
      <div className="md:flex-[1_1_65%] w-full  rounded-md">
        <Link
          href={`/bai-viet/${latestPost.slug}`}
          className="relative overflow-hidden  group cursor-pointer"
        >
          <Image
            src={latestPost.hinhanh}
            alt="img"
            width={500}
            height={500}
            className="w-full h-auto"
          />
          <h6 className="group-hover:text-blue-500 font-semibold mt-2 text-gray-900 md:text-lg text-base leading-3 text-justify">
            {latestPost.tieude}
          </h6>
        </Link>
      </div>
      <div className="md:flex-[1_1_35%] w-full">
        <FamousPost />
      </div>
    </div>
  );
};

export default Featured;
