import { Suspense } from "react";
import { FaceSmileIcon } from "@heroicons/react/24/solid";
import { displayDate } from "@/helpers/utils";
const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded";

const CommentList = ({ comments }) => {
  return (
    <Suspense
      fallback={
        <article className="p-6 ">
          <footer className="flex items-center mb-2 gap-3">
            <div
              className={"bg-neutral-300 w-12 h-12 animate-pulse rounded-full"}
            ></div>
            <div
              className={"bg-neutral-300 h-4 w-3/12 animate-pulse rounded"}
            ></div>
          </footer>
          <div
            className={"bg-neutral-300 h-8 w-full animate-pulse rounded"}
          ></div>
        </article>
      }
    >
      {comments?.length ? (
        comments?.map((item) => (
          <article
            key={item.id}
            className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={item.image}
                    alt="Helene Engels"
                  />
                  {item.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time
                    pubdate=""
                    dateTime="2022-06-23"
                    title="June 23rd, 2022"
                  >
                    {displayDate(item.createAt)}
                  </time>
                </p>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{item.content}</p>
          </article>
        ))
      ) : (
        <article className="p-6 text-center h-[100px] text-base bg-white border-t border-gray-200 ">
          <div className="  text-gray-500 sm:text-lg text-base">
            <FaceSmileIcon className="mx-auto h-10 w-10 " />
            Chưa có bình luận ...
          </div>
        </article>
      )}
    </Suspense>
  );
};

export default CommentList;
