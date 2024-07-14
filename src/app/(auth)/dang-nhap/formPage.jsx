"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { doCredentialLogin } from "@/app/action";

const FormLogin = () => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        throw new Error("Network response was not ok");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login Failed:", error);
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="username"
        >
          Tên tài khoản
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          name="username"
          required
          type="text"
        />
      </div>
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2 ">
          <label
            className="text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="password"
          >
            Mật khẩu
          </label>
          <Link href={"#"} className="text-blue-500 text-sm hover:underline">
            Quên mật khẩu?
          </Link>
        </div>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          name="password"
          required
          type="password"
        />
      </div>
      {error && (
        <span className="block md:text-sm text-xs text-rose-500 mb-1.5">
          Thông tin đăng nhập không chính xác!
        </span>
      )}
      <button
        className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >
        Đăng nhập
      </button>
    </form>
  );
};

export default FormLogin;
