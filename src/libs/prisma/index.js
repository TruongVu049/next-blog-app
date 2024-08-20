import { unstable_cache } from "next/cache";
import prisma from "./prisma";
import { TAGS } from "../constants";
import {
  getCategoriesQuery,
  getPostsQuery,
  getSimilarPostsQuery,
  getRecentPostsQuery,
  getCommentsQuery,
  createCommentQuery,
  getPostDetailQuery,
  getPostsWithParamsQuery,
  getPostByCategoryQuery,
  getToTalPagePostsQuery,
  getToTalPagePostsByCategoryQuery,
  getTopViewedPostsQuery,
  getPostOfUserQuery,
  removePostQuery,
} from "./queries";

export async function PrismaUnstableCache(
  query,
  cache = "force-cache",
  tags,
  rld,
  key
) {
  try {
    console.log(
      "get database ========================================================"
    );
    const result = await unstable_cache(
      async () => {
        return query();
      },
      [...key],
      {
        cache: cache,
        tags: [...tags],
        revalidate: rld,
      }
    )();
    return result;
  } catch (e) {
    const queryString = JSON.stringify(query);
    throw {
      error: e,
      queryString,
    };
  }
}

const reshapeCategories = (categories) => {
  const reshapedCategories = [];
  for (const category of categories) {
    if (category) {
      reshapedCategories.push({
        ...category,
        path: `/tim-kiem/${category.slug}`,
      });
    }
  }
  return reshapedCategories;
};

export async function getCategories() {
  const getCachedCategories = await PrismaUnstableCache(
    () => getCategoriesQuery(),
    undefined,
    [TAGS.categories],
    320,
    ["category"]
  );
  const categories = [...reshapeCategories(getCachedCategories)];
  return categories;
}

export async function getPosts() {
  const getCachedPosts = await PrismaUnstableCache(
    () => getPostsQuery(),
    undefined,
    [TAGS.posts],
    60,
    ["list-post"]
  );
  return getCachedPosts;
}

export async function getTopViewedPosts() {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const getCachedPosts = await PrismaUnstableCache(
    () => getTopViewedPostsQuery(sevenDaysAgo, now),
    undefined,
    [TAGS.topposts],
    60,
    ["list-top-post"]
  );
  return getCachedPosts;
}

export async function getPostsByCategory(categorySlug, currentPage, limit) {
  const skip = (currentPage - 1) * limit;
  const getCachedPosts = await PrismaUnstableCache(
    () =>
      getPostByCategoryQuery(
        categorySlug === "all" ? null : categorySlug,
        skip,
        limit
      ),
    "no-store",
    [categorySlug, `'${currentPage}'`],
    60,
    [`list-post-category-${categorySlug}-${currentPage}`]
  );
  return getCachedPosts;
}
export async function getToTalPagePostsByCategory(categorySlug, limit) {
  const totalPage = await getToTalPagePostsByCategoryQuery(
    categorySlug === "all" ? null : categorySlug,
    limit
  );
  return totalPage;
}

export async function getSimilarPosts(slug, categoryid) {
  const getCacheSimilarPosts = await PrismaUnstableCache(
    () => getSimilarPostsQuery(slug, categoryid),
    "no-store",
    [TAGS.similarPosts, `'${slug}'`, `'${categoryid}'`],
    60,
    [`similar-post-${slug}-${categoryid}`]
  );
  return getCacheSimilarPosts;
}

export async function getRecentPosts() {
  const getCacheReCentPosts = await PrismaUnstableCache(
    () => getRecentPostsQuery(),
    undefined,
    [TAGS.recentPosts],
    320,
    ["recent-post"]
  );
  return getCacheReCentPosts;
}

export async function getComments(postid) {
  const comments = await getCommentsQuery(postid);
  return comments;
}
export async function createComment(comment) {
  const createComment = await PrismaUnstableCache(
    () => createCommentQuery(comment),
    "no-store",
    [TAGS.comment],
    60,
    [`create-comment-${JSON.stringify(comment)}`]
  );
  return createComment;
}

export async function getPostDetail(slug) {
  const getCachedPost = await PrismaUnstableCache(
    () => getPostDetailQuery(slug),
    undefined,
    [slug],
    320,
    [`post-detail-${slug}`]
  );
  return getCachedPost;
}

export async function getPostsWithParams(currentPage, limit, search) {
  const skip = (currentPage - 1) * limit;
  const getCachedPosts = await PrismaUnstableCache(
    () => getPostsWithParamsQuery(skip, limit, search),
    "no-store",
    [`${search}`],
    60,
    [`search-post-${search}`]
  );
  return getCachedPosts;
}

export async function getToTalPagePosts(search, limit) {
  const totalPage = await getToTalPagePostsQuery(search, limit);
  return totalPage;
}

export async function getLatestPost() {
  const latestPost = await prisma.Post.findFirst({
    orderBy: {
      updatedAt: "desc",
    },
  });
  return latestPost;
}

export async function getPostOfUser(userId) {
  const posts = await getPostOfUserQuery(userId);
  return posts;
}

export async function register(formData) {
  try {
    const data = await prisma.user.create({
      data: {
        name: formData.name,
        username: formData.username,
        password: formData.password,
      },
    });
    return data;
  } catch (err) {
    return null;
  }
}

export async function login(username) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch (err) {
    return null;
  }
}

export async function createPost(formData) {
  try {
    const post = await prisma.Post.create({
      data: {
        title: formData.title,
        content: formData.content,
        image: formData.image,
        slug: formData.slug,
        id_category: parseInt(formData.category),
        id_user: formData.userId,
      },
    });
    return post;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function updatePost(formData) {
  try {
    const post = await prisma.Post.update({
      where: {
        id: formData.id,
      },
      data: {
        title: formData.title,
        content: formData.content,
        image: formData.image,
        slug: formData.slug,
        id_category: parseInt(formData.category),
      },
    });
    return post;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function removePost(postid) {
  const deletePost = await removePostQuery(parseInt(postid));
  return deletePost;
}
