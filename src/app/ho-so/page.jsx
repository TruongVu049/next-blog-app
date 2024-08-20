import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";
import Image from "next/image";
import { MyPosts, MyPostSkeloton } from "./myPosts";
import { Suspense } from "react";
const Profile = async () => {
  const session = await auth();
  const loggedInUser = session?.user;
  if (!loggedInUser) redirect(LOGIN);
  return (
    <main className="max-w-screen-xl block mx-auto px-3">
      <div className="md:grid md:grid-cols-4 flex  flex-col-reverse  gap-4 items-start  md:pt-16 pt-10">
        <div className="md:col-span-3 w-full border-r  border-gray-300">
          <h2 className="md:block hidden md:text-4xl text-2xl md:pb-10 pb-6 md:font-bold font-semibold text-gray-700 border-b border-gray-300">
            {loggedInUser?.name}
          </h2>
          <hr className="md:hidden block md:h-0 h-1 bg-gray-200" />
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-4 md:my-8 my-8 pt-2 pr-2 ">
                {new Array(4).fill(null).map((item, index) => (
                  <MyPostSkeloton key={`skeloton-${index}`} />
                ))}
              </div>
            }
          >
            <MyPosts userId={loggedInUser.id} />
          </Suspense>
        </div>
        <div className="md:ml-10 ml-0">
          <div className="md:block flex items-center gap-6 mb-3">
            <Image
              width={100}
              height={100}
              alt="avatar"
              src={
                loggedInUser?.image
                  ? loggedInUser?.image
                  : "/static/img-user.png"
              }
            />
            <div>
              <h3 className="font-semibold text-gray-800 mt-2 md:text-base text-2xl">
                {loggedInUser?.name}
              </h3>
              <button className="text-blue-600 font-semibold hover:underline hover:text-blue-700 mt-2 md:text-base text-lg">
                Chỉnh sửa hồ sơ
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
