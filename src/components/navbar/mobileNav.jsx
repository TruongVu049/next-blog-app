"use client";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid";
const MobileNav = ({ links, openNav, handleOpenNav }) => {
  return (
    <>
      <div
        className={`${
          !openNav && "hidden"
        } md:hidden duration-300 border  delay-0 ease-linear bg-[rgba(0,0,0,0.4)] overflow-y-auto overflow-x-hidden  fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div
          className="relative float-right bg-white h-full  w-[80%] border-l border-gray-300 
      z-[998] p-4 pt-6 animate-fadeInLeft"
        >
          <button
            type="button"
            className=" float-right inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          >
            <XMarkIcon
              onClick={() => handleOpenNav(false)}
              className="w-6 h-6 font-bold "
            />
          </button>
          <ul className="font-medium mt-8 ">
            {links?.length
              ? links?.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      className="border-b border-gray-200 block py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                    >
                      {item.title}
                    </Link>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
