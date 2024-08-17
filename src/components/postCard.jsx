import { displayDate } from "@/helpers/utils";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon } from "@heroicons/react/24/solid";

const PostCard = ({ post }) => {
  return (
    <Link href={`/bai-viet/${post.slug}`}>
      <div className={`flex flex-col gap-2 rounded cursor-pointer h-full `}>
        <div>
          <Image
            width={500}
            height={500}
            alt={post.title}
            src={post?.image}
            className="object-contain sm:object-cover object-top w-full sm:h-72 md:h-60 rounded"
          />
        </div>
        <div className="flex flex-col gap-2 justify-between h-full">
          <div>
            <div>
              <p className="text-sm font-[500] text-[#7c7c7c]">
                {post.category.title}
              </p>
              <h2 className="sm:text-xl font-semibold">{post.title}</h2>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div>
                <Image
                  src={post.user.image}
                  width={40}
                  height={40}
                  alt={post.user.name}
                  className="cursor-pointer object-cover object-top rounded-full"
                />
              </div>
              <div>
                <p className="cursor-pointer text-sm font-[500]">
                  {post.user.name}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <CalendarIcon className="text-indigo-500 h-5 w-5" />
                  <p className="text-[#7c7c7c] text-sm">
                    {displayDate(post.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-700">
              {post.content.substring(3, 100).concat(" ...")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
