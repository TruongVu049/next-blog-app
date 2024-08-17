"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/app/helper";
const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto lg:block hidden">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 " />
        </div>
        <input
          key={searchParams?.get("q")}
          type="text"
          name="search"
          placeholder="Tìm kiếm ..."
          autoComplete="off"
          defaultValue={searchParams?.get("q") || ""}
          className="block w-full p-2 ps-10 text-sm text-gray-900  rounded-3xl bg-gray-100 focus:ring-gray-300 focus:border-gray-300 "
        />
      </div>
    </form>
  );
};

export default SearchBar;
