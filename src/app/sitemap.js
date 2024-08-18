import { getPosts } from "@/libs/prisma";
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const blogRoutes = await getPosts().then((post) =>
    post.map((item) => ({
      url: `${baseUrl}/bai-viet/${item.slug}`,
      lastModified: item.updatedAt,
    }))
  );
  const routes = ["", "dang-nhap", "dang-ky", "tim-kiem"].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...blogRoutes];
}
