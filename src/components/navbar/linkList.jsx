"use client";
import Link from "next/link";
import MobileNav from "./mobileNav";
import SearchBar from "../searchBar";
import {
  PencilSquareIcon,
  UserCircleIcon,
  DocumentTextIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const LinkList = ({ categories, loggedInUser, children }) => {
  const [scroll, setScroll] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const pathname = usePathname();

  const handleScroll = () => {
    setScroll(window.scrollY > 150);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={`${
          scroll
            ? "py-2 fixed w-full top-0 animate-fadeInDown  shadow-md"
            : "mx-auto "
        } bg-white w-full z-50 `}
      >
        <div
          className={
            "relative z-50 max-w-screen-xl bg-white flex flex-wrap items-center justify-between p-3 mx-auto"
          }
        >
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
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
                {categories.length
                  ? categories?.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.path}
                          className={`${
                            pathname === `/tim-kiem/${item.slug}`
                              ? "text-blue-700"
                              : "text-gray-900 md:hover:text-blue-700"
                          } block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0`}
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
                    <div className="relative shadow-lg z-[999] bg-white border border-violet-600 rounded-md mt-2 ">
                      <Link
                        href={"/ho-so"}
                        className="flex items-center hover:opacity-90 hover:text-violet-600 group w-full gap-2 py-2 px-3 text-gray-900 border-b border-violet-400"
                      >
                        <DocumentTextIcon className="w-6 h-6  text-gray-700  " />
                        Bài viết
                      </Link>
                      {children}
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
            <button
              type="button"
              onClick={() => setOpenNav(true)}
              className="border-2 border-violet-600 ml-4 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <MobileNav
        links={categories}
        openNav={openNav}
        handleOpenNav={setOpenNav}
      />
    </>
  );
};

export default LinkList;
