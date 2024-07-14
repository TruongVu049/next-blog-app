"use client";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { usePathname, useSearchParams } from "next/navigation";
const Pagination = ({ totalPages, currentPage }) => {
  console.log("render CartList");

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasPrev = 1 * (currentPage - 1) > 0;
  const hasNext = 1 * (currentPage - 1) + 1 < totalPages;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav className="md:float-right md:block flex justify-center">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <Link
            href={`${createPageURL(currentPage - 1)}`}
            scroll={false}
            className={`${
              hasPrev
                ? "flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                : "pointer-events-none cursor-default flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
            }`}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="w-3 h-3" />
          </Link>
        </li>
        {new Array(totalPages).fill(0, 0).map((item, i) => (
          <li key={`${item}__${i}`}>
            <Link
              href={`${createPageURL(i + 1)}`}
              aria-current="page"
              scroll={false}
              className={`px-4 h-10  leading-tight flex items-center justify-center ${
                currentPage - 1 === i
                  ? "z-10  text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                  : " text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              } `}
            >
              {i + 1}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={`${createPageURL(currentPage + 1)}`}
            scroll={false}
            className={`${
              hasNext
                ? "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                : "pointer-events-none cursor-default flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="w-3 h-3" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
