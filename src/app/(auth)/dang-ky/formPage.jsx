"use client";
import Link from "next/link";
import { SubmitButton } from "@/components/submitButton";
import { useRouter } from "next/navigation";
import NofiModal from "@/components/nofiModal";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const FormRegister = () => {
  const router = useRouter();
  const [dataForm, setDataForm] = useState({ hide: true, status: false });

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("fullname"),
      username: formData.get("username"),
      password: formData.get("password"),
    };
    console.log(data);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setDataForm({
        hide: false,
        status: true,
      });
    } catch (err) {
      console.error("Registration Failed:", err);
      setDataForm({
        hide: false,
        status: false,
      });
    }
  }

  return (
    <>
      {!dataForm.hide && (
        <NofiModal onClose={() => router.push("/dang-nhap")}>
          <div className="text-center">
            {dataForm.status ? (
              <CheckCircleIcon className="mx-auto w-12 h-12 text-green-600" />
            ) : (
              <ExclamationCircleIcon className="mx-auto w-12 h-12 text-green-600" />
            )}
          </div>
          <p className="md:text-base text-sm text-gray-900">
            {dataForm.status
              ? "Đăng ký tài khoản thành công."
              : "Đã có lỗi xảy ra. Vui lòng thực hiện lại!"}
          </p>
        </NofiModal>
      )}
      <form className="w-full" onSubmit={handleSubmit}>
        <h2 className="md:text-xl text-center mb-4 font-bold text-base">
          ĐĂNG KÝ
        </h2>
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
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="fullname"
          >
            Họ tên
          </label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="fullname"
            required
            type="text"
          />
        </div>
        <div className="mb-5 clas">
          <div className="flex items-center justify-between mb-2 ">
            <label
              className="text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="password"
            >
              Mật khẩu
            </label>
          </div>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="password"
            required
            type="password"
          />
        </div>
        <SubmitButton
          cName={
            "text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          }
          title={"Đăng ký"}
        />
      </form>
    </>
  );
};

export default FormRegister;
