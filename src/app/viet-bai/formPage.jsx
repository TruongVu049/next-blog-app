"use client";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { uploadImg } from "@/libs/firebase/uploadImg";
import { useRouter } from "next/navigation";

const FormWriteBlog = ({ category }) => {
  const router = useRouter();
  // Editor state
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");

  const quill = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      image: media,
      content: value,
      slug: slugify(formData.get("title")),
    };
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        const data = await res.json();
        router.push(`/bai-viet/${data.res["slug"]}`);
      }
    } catch (err) {
      console.error("error");
    }
  }

  const imageHandler = useCallback(() => {
    "use client";
    if (typeof window !== "undefined") {
      const input = document?.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = () => {
        const file = input.files[0];
        const quillEditor = quill.current.getEditor();
        const range = quillEditor.getSelection(true);
        uploadImg(file, (downloadURL) => {
          quillEditor.insertEmbed(range.index, "image", downloadURL);
        });
      };
    }
  }, []);

  useEffect(() => {
    uploadImg(file, setMedia);
  }, [file]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],
          [
            {
              color: [
                "white",
                "#64748b",
                "#4b5563",
                "#52525b",
                "#525252",
                "#57534e",
                "#dc2626",
                "#ea580c",
                "#d97706",
                "#ca8a04",
                "#facc15",
                "#84cc16",
                "#22c55e",
                "#14b8a6",
                "#06b6d4",
                "#0ea5e9",
                "#3b82f6",
                "#6366f1",
                "#8b5cf6",
                "#a855f7",
                "#d946ef",
                "##ec4899",
                "##e11d48",
              ],
            },
          ],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <main className="lg:container block mx-auto px-3">
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="mb-3">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Tiêu đề
          </label>
          <input
            type="text"
            name="title"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Chọn danh mụ
          </label>
          <select
            name="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            {category &&
              category.map((item, i) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.tieude}
                  </option>
                );
              })}
            <option value="other">Khác</option>
          </select>
        </div>
        <div className="mb-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
            htmlFor="file_input"
          >
            Hình ảnh
          </label>
          <input
            className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
            type="file"
            id="image"
            name="file_input"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            SVG, PNG, JPG, GIF (MAX. 800x400px).
          </p>
          <div className="h-32 w-auto ">
            {media && (
              <Image
                width={32}
                height={32}
                alt="image"
                className="h-32 w-auto"
                src={media}
              />
            )}
          </div>
        </div>

        <div className="mb-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
            htmlFor="file_input"
          >
            Nội dung
          </label>
          <QuillEditor
            ref={(el) => (quill.current = el)}
            className="h-[500px] mt-4 mb-16"
            theme="snow"
            value={value}
            formats={formats}
            modules={modules}
            onChange={(value) => setValue(value)}
          />
          <button
            type="submit"
            className="px-4 py-2 border-none bg-violet-600 text-white rounded-lg"
          >
            Đăng bài
          </button>
        </div>
      </form>
    </main>
  );
};

export default FormWriteBlog;
