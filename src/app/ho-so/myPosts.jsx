import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getPostOfUser } from "@/libs/prisma";
import Image from "next/image";
import { displayDate } from "@/helpers/utils";
import RemovePost from "./removePost";

export const MyPosts = async ({ userId }) => {
  const posts = await getPostOfUser(userId);
  return (
    <div className="grid grid-cols-1 gap-4 md:my-8 my-8 pt-2 pr-2 ">
      {posts?.length
        ? posts.map((item, i) => (
            <div
              key={item.id}
              className="cursor-pointer  grid grid-cols-4 gap-y-6 gap-x-4"
            >
              <div>
                <Image
                  width={200}
                  height={200}
                  alt={item.title}
                  src={item?.image}
                  className="object-cover h-24 w-full rounded"
                />
              </div>
              <div className="col-span-3 flex flex-col justify-between">
                <Link href={`/bai-viet/${item?.slug}`}>
                  <h2 className="md:text-xl hover:text-blue-600 md:font-bold text-gray-900 font-semibold text-lg">
                    {item?.title}
                  </h2>
                </Link>
                <div className="mb-2 text-gray-700 flex justify-between">
                  <span>{displayDate(item.updatedAt)}</span>
                  <div className="flex items-center gap-4 mr-4">
                    <Link href={`/chinh-sua/${item.slug}`}>
                      <PencilSquareIcon className="w-5 h-5 hover:text-blue-600 text-gray-700" />
                    </Link>
                    <RemovePost postid={item.id} />
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export const MyPostSkeloton = () => {
  return (
    <div className="cursor-pointer grid grid-cols-4 gap-y-6 gap-x-4">
      <div
        className={"bg-neutral-300 h-24 w-auto  animate-pulse rounded"}
      ></div>
      <div className="col-span-3 flex flex-col justify-between">
        <div
          className={"bg-neutral-300 h-16 w-full animate-pulse rounded"}
        ></div>
        <div
          className={"bg-neutral-300 h-6 w-full animate-pulse rounded"}
        ></div>
      </div>
    </div>
  );
};
