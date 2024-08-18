import { getPosts } from "@/libs/prisma";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export default function sitemap() {
  const blogRoutes = getPosts().then((post) =>
    post.map((item) => ({
      url: `${baseUrl}/bai-viet/${item.slug}`,
      lastModified: item.updatedAt,
    }))
  );

  const routes = ["", "dang-nhap", "dang-ky", "tim-kiem"].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogRoutes];
}
