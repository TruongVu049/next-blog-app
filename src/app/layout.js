import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import AuthContext from "@/context/authContext";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog - Tin tức mới nhất 24h qua - VNblog",
  description: "Blog - Tin tức mới nhất 24h qua - VNblog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AuthContext>
          <Navbar />
          {children}
        </AuthContext>
        <div id="root-modal"></div>
      </body>
    </html>
  );
}
