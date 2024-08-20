import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Suspense } from "react";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "vnblog Chia Sẻ Kiến Thức - Blog Đa Lĩnh Vực",
    template: `%s | vnblog Chia Sẻ Kiến Thức - Blog Đa Lĩnh Vực`,
  },
  description:
    "Nơi bạn có thể tự do viết và chia sẻ bài viết về mọi chủ đề. Tham gia blog cộng đồng để tìm kiếm thông tin, đọc bài viết hữu ích, và kết nối với người đọc cùng đam mê.",
  openGraph: {
    title: "vnblog Chia Sẻ Kiến Thức - Blog Đa Lĩnh Vực",
    description:
      "Nơi bạn có thể tự do viết và chia sẻ bài viết về mọi chủ đề. Tham gia blog cộng đồng để tìm kiếm thông tin, đọc bài viết hữu ích, và kết nối với người đọc cùng đam mê.",
    url: "./",
    siteName: "vnblog Chia Sẻ Kiến Thức - Blog Đa Lĩnh Vực",
    images: [`${baseUrl}/static/images/twitter-card.png`],
    locale: "vi_VN",
    type: "website",
  },
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${baseUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "vnblog Chia Sẻ Kiến Thức - Blog Đa Lĩnh Vực",
    card: "summary_large_image",
    images: [`${baseUrl}/static/images/twitter-card.png`],
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang={"vi"} className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <Suspense>
          <Navbar />
        </Suspense>
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <Suspense>{children}</Suspense>
        <div id="root-modal"></div>
        <Suspense>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
