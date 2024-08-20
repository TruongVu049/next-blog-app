"use client";
import NofiModal from "@/components/nofiModal";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { doRemovePost } from "../action";
const RemovePost = ({ postid }) => {
  const [openModal, setOpenModal] = useState(false);

  function handleModal() {
    setOpenModal(!openModal);
  }
  return (
    <div>
      <button onClick={handleModal}>
        <TrashIcon className="w-5 h-5 hover:text-blue-600  text-gray-700" />
      </button>
      {openModal === true && (
        <NofiModal onClose={handleModal} title={""}>
          <form action={doRemovePost}>
            <input
              className="sr-only"
              type="text"
              name="postid"
              value={postid}
              defaultValue={""}
            />
            <h6 className="md:text-lg text-base my-6">
              Bạn có chắc chắn muốn xóa bài viết này không?
            </h6>
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleModal}
                className="px-3 py-1.5 w-full border border-rose-500 rounded-md text-rose-500 hover:bg-rose-600 hover:text-white"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-white rounded-md w-full bg-rose-500 hover:bg-rose-600"
              >
                Xóa
              </button>
            </div>
          </form>
        </NofiModal>
      )}
    </div>
  );
};

export default RemovePost;
