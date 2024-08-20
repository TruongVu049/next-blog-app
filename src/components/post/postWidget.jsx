"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { displayDate } from "@/helpers/utils";

const PostWidget = ({ categoryID, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    let ignore = false;
    const url = slug
      ? `/api/posts?slug=${slug}&categoryid=${categoryID}`
      : `/api/posts`;
    fetch(url, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setRelatedPosts(data.res);
        }
      });
    return () => {
      ignore = true;
    };
  }, [slug]);
  return (
    <ul className="flex flex-col gap-4">
      {relatedPosts?.map((post) => (
        <Link
          href={`/bai-viet/${post.slug}`}
          key={post.slug}
          className="flex items-center gap-1 border-b border-[#d4d4d4] pb-2"
        >
          <Image
            src={post.image}
            width={100}
            height={100}
            alt={post.title}
            className="object-cover object-top w-1/3 aspect-auto mr-1"
          />
          <li className="hover:text-indigo-500 w-2/3">
            <p className="text-sm text-justify line-clamp-2">{post.title}</p>
            <p className="text-xs">{displayDate(post.updatedAt)}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default PostWidget;
