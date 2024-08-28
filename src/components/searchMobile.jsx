"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/helpers/utils";
import { useState, useRef, useEffect } from "react";
const SearchMobile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    if (openSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openSearch]);

  function onSubmit(e) {
    e.preventDefault();

    const val = e.target;
    const search = val.search;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }
    router.push(createUrl("/tim-kiem", newParams));
    setOpenSearch(!openSearch);
  }

  return (
    <>
      <button
        onClick={() => setOpenSearch(!openSearch)}
        className=" inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 " />
      </button>
      <div
        className={`${
          openSearch ? "fixed" : "hidden"
        } top-[88px] left-0 right-0  animate-fadeInDown z-50`}
      >
        <div className="container mx-auto">
          <form
            onSubmit={onSubmit}
            className="relative border border-violet-600 p-3 rounded-[5px] sm:mx-[40px] mx-[20px] shadow-[0px_5px_15px_rgba(0,0,0,0.35)] flex items-center gap-x-[10px] content-stretch bg-white"
          >
            <div className="w-[90%]">
              <input
                ref={inputRef}
                key={searchParams?.get("q")}
                type="text"
                name="search"
                placeholder="Tìm kiếm ..."
                autoComplete="off"
                defaultValue={searchParams?.get("q") || ""}
                className="block w-full p-2 ps-3 text-sm text-gray-900 border border-gray-200  rounded-md bg-gray-100 focus:ring-gray-300 focus:border-gray-300 "
              />
            </div>
            <button type="submit" className="w-[10%] p-3 rounded-md ">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-700 hover:text-violet-600" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchMobile;
