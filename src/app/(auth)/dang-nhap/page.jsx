import FormLogin from "./formPage";
import SocialLogins from "./SocialLogins";
import Link from "next/link";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await auth();
  const loggedInUser = session?.user;

  if (loggedInUser) redirect("/");

  return (
    <div className="md:h-[80vh] md:mt-0 mt-10 w-full flex items-center justify-center">
      <div className="relative sm:w-[380px]">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-400 rounded-lg blur opacity-40  transition duration-1000 "></div>
        <div className="relative w-full px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start ">
          <div className="w-full">
            <h2 className="md:text-xl font-bold text-base">XIN CHÀO!</h2>
            <SocialLogins />
            <div className="flex items-center my-4">
              <div className="w-full h-[0.5px] bg-gray-600"></div>
              <span className="mx-4"> or </span>
              <div className="w-full h-[0.5px] bg-gray-600"></div>
            </div>
            <FormLogin />
            <p className="md:text-base text-sm text-center text-gray-900 mt-2">
              Bạn chưa có tài khoản?
              <Link className="text-blue-500 hover:underline" href={"dang-ky"}>
                {" "}
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
