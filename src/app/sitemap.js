import { getCategories, getPosts } from "@/libs/prisma";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const routesMap = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const categoriesPromise = getCategories().then((category) =>
    category.map((item) => ({
      url: `${baseUrl}${item.path}`,
      lastModified: item.updatedAt,
    }))
  );

  const postsPromise = getPosts().then((post) =>
    post.map((item) => ({
      url: `${baseUrl}/bai-viet/${item.slug}`,
      lastModified: item.updatedAt,
    }))
  );

  let fetchedRoutes = [];

  try {
    fetchedRoutes = (
      await Promise.all([categoriesPromise, postsPromise])
    ).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}
