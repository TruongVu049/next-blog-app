"use client";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

const Social = ({ slug, content }) => {
  return (
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 group rounded-md flex items-center gap-2 px-3 py-1.5 text-white hover:opacity-80">
        <HandThumbUpIcon className="w-5 h-5 group-focus:text-blue-900" />
        Thích
      </button>
      <div className=" flex gap-4">
        <FacebookShareButton
          url={`${baseUrl}/bai-viet/${slug}`}
          quote={content}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={`${baseUrl}/bai-viet/${slug}`} quote={content}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={`${baseUrl}/bai-viet/${slug}`}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default Social;
