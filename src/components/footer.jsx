import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-300">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  items-start gap-8 sm:gap-6 ">
          <div className="mb-6 md:mb-0">
            <Link
              href={"/"}
              className="flex items-center space-x-3 rtl:space-x-reverse text-rose-500 p-1 rounded-full self-center md:text-xl text-lg whitespace-nowrap"
            >
              vn
              <span className="text-gray-900  ">blog</span>
            </Link>
          </div>
          <div>
            <h2 className="mb-6 md:text-lg text-base font-semibold text-gray-900 uppercase dark:text-white">
              Giới thiệu
            </h2>
            <div className="text-gray-500  font-medium">
              <h4>vnblog Chia Sẻ Kiến Thức - Blog Đa Lĩnh Vực</h4>
              <p>
                Nơi bạn có thể tự do viết và chia sẻ bài viết về mọi chủ đề.
                Tham gia blog cộng đồng để tìm kiếm thông tin, đọc bài viết hữu
                ích, và kết nối với người đọc cùng đam mê.
              </p>
            </div>
          </div>
          <div>
            <h2 className="mb-6 md:text-lg text-base font-semibold text-gray-900 uppercase dark:text-white">
              Follow us
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a
                  className="hover:underline "
                  href="https://github.com/TruongVu049"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="text-center">
          <span className="text-md text-gray-500 sm:text-center ">
            © {new Date().getFullYear()} TruongVu
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
