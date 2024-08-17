import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";
import { getPostOfUser } from "@/libs/prisma";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
const Profile = async () => {
  const session = await auth();
  const loggedInUser = session?.user;

  if (!loggedInUser) redirect(LOGIN);

  const posts = await getPostOfUser(loggedInUser?.id);

  return (
    <main className="max-w-screen-xl block mx-auto px-3">
      <div className="grid md:grid-cols-3 gap-4 items-start  md:pt-16 pt-10">
        <div className="md:col-span-2 border-r  border-gray-300">
          <h2 className="md:text-4xl text-2xl md:pb-10 pb-6 md:font-bold font-semibold text-gray-700 border-b border-gray-300">
            {loggedInUser?.name}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:mt-8 pt-2 pr-2  ">
            {posts &&
              posts.map((item, i) => (
                <div
                  key={item.id}
                  className="cursor-pointer  grid grid-cols-4 md:gap-3 gap-2"
                >
                  <div>
                    <Image
                      width={200}
                      height={200}
                      alt="avatar"
                      src={item?.hinhanh}
                      className="h-auto w-full"
                    />
                  </div>
                  <div className="col-span-3 flex flex-col justify-between">
                    <Link href={`/bai-viet/${item?.slug}`}>
                      <h2 className="md:text-xl hover:text-blue-600 md:font-bold text-gray-900 font-semibold text-lg">
                        {item?.tieude}
                      </h2>
                    </Link>
                    <div className="mb-2 text-gray-700 flex justify-between">
                      <span>{new Date(item?.ngaytao).toLocaleString()}</span>
                      <div className="flex items-center gap-4 mr-4">
                        <Link href={`/chinh-sua/${item.slug}`}>
                          <PencilSquareIcon className="w-5 h-5 hover:text-blue-600 text-gray-700" />
                        </Link>
                        <TrashIcon className="w-5 h-5 hover:text-blue-600  text-gray-700" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="ml-10">
          <div className="">
            <Image
              width={100}
              height={100}
              alt="avatar"
              src={loggedInUser?.image}
            />
            <h3 className="font-semibold text-gray-800 mt-2">
              {loggedInUser?.name}
            </h3>
            <button className="text-blue-600 font-semibold hover:underline hover:text-blue-700">
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
