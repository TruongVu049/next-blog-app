import Link from "next/link";
import MobileNav from "./mobileNav";
import SearchBar from "../searchBar";
import FormLogout from "../formLogout";
import { auth } from "@/utils/auth";
import {
  PencilSquareIcon,
  UserCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { getCategories } from "@/libs/prisma";

const Navbar = async () => {
  const session = await auth();
  const loggedInUser = session?.user;
  const categories = await getCategories();
  return (
    <nav className="bg-white border-gray-200 border-b py-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <div className="flex items-center gap-6">
          <Link
            href={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse text-rose-500 p-1 rounded-full self-center md:text-xl text-lg whitespace-nowrap"
          >
            vn
            <span className="text-gray-900  ">blog</span>
          </Link>
          <SearchBar />
        </div>
        <div className="flex items-center">
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {categories.length
                ? categories?.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.path}
                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
          </div>
          {loggedInUser ? (
            <div className="flex items-center gap-6 ml-6">
              <Link
                href={"/viet-bai"}
                className="flex items-center gap-2 hover:opacity-70 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full px-4 py-2 text-white"
              >
                <PencilSquareIcon className="w-4 h-4 text-white" />
                Viết bài
              </Link>
              <div className="md:flex md:text-sm text-xs hidden relative px-4 py-1.5 cursor-pointer hover:bg-violet-600 hover:text-white group  items-center gap-2 border-2 border-violet-600 rounded-full">
                <UserCircleIcon className="w-6 h-6  text-violet-600 group-hover:text-white" />
                {loggedInUser.name.substring(0, 8).concat(" ...")}
                <div className="absolute hidden group-hover:block top-[100%] left-0 w-full  ">
                  <div className="z-[999] bg-white border border-violet-600 rounded-md mt-2 shadow-md">
                    <Link
                      href={"/ho-so"}
                      className="flex items-center hover:opacity-90 hover:text-violet-600 group w-full gap-2 py-2 px-3 text-gray-900 border-b border-violet-400"
                    >
                      <InformationCircleIcon className="w-6 h-6  text-gray-700  " />
                      Thông tin
                    </Link>
                    <FormLogout />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href={"/dang-nhap"}
              className="ml-6 flex items-center gap-2 hover:opacity-70 bg-gradient-to-r from-blue-600 to-violet-600 rounded-md px-4 py-2 text-white"
            >
              Đăng Nhập
            </Link>
          )}
          <MobileNav links={categories} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
