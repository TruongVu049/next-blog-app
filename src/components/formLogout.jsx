import { doLogout } from "@/app/action";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
const FormLogout = () => {
  return (
    <form action={doLogout}>
      <button
        type="submit"
        className="flex items-center hover:opacity-90 hover:text-violet-600 group w-full gap-2 py-2 px-3 text-gray-900 border-b border-violet-400"
      >
        <ArrowLeftStartOnRectangleIcon className="w-6 h-6  text-gray-700  " />
        Đăng Xuất
      </button>
    </form>
  );
};

export default FormLogout;
