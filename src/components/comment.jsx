"use client";
import Link from "next/link";
import { LOGIN } from "@/libs/routes";
import { useState, useEffect, useRef } from "react";
import CommentList from "./commentList";
const Comment = ({ postid, user }) => {
  const [comments, setComments] = useState([]);
  const bottomRef = useRef(null);
  let isLoadingComment = false;
  function handleGetComments() {
    fetch(`/api/comments?postid=${postid}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        console.log("comments", data);
        setComments(data.res);
      });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isLoadingComment) {
            handleGetComments();
            isLoadingComment = true;
          }
        }
      },
      {
        root: null, // null means it observes the viewport
        rootMargin: "0px",
        threshold: 0.1, // 10% of the target element is visible
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        name: user.name,
        image: user?.image ? user?.image : "/static/img-user.png",
        content: formData.get("comment"),
        id_post: postid,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          handleGetComments();
          e.reset();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }
  return (
    <section className="md:px-4 px-0 py-4 lg:py-8 bg-white antialiased">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
          Bình luận
        </h2>
      </div>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={4}
            className="px-0 w-full text-sm text-gray-700 border-0 focus:ring-0 focus:outline-none  "
            placeholder="Viết bình luận ..."
            required=""
            defaultValue={""}
            name="comment"
          />
        </div>
        {user ? (
          <button
            type=""
            className="hover:bg-blue-700 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800"
          >
            Gửi bình luận
          </button>
        ) : (
          <Link
            href={LOGIN}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800"
          >
            Gửi bình luận
          </Link>
        )}
      </form>
      <div ref={bottomRef}></div>
      <CommentList comments={comments} />
    </section>
  );
};

export default Comment;
