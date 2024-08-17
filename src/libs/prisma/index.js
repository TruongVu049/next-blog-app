import { unstable_cache } from "next/cache";
import prisma from "./prisma";
import { TAGS } from "../constants";

export async function PrismaUnstableCache(
  query,
  cache = "force-cache",
  tags,
  rld
) {
  try {
    console.log(
      "get database ========================================================"
    );
    const result = await unstable_cache(
      async () => {
        return query();
      },
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

export async function getCategoriesQuery() {
  return await prisma.Category.findMany();
}

export async function getCategories() {
  const getCachedCategories = await PrismaUnstableCache(
    () => getCategoriesQuery(),
    undefined,
    [TAGS.categories],
    320
  );
  const categories = [...reshapeCategories(getCachedCategories)];
  return categories;
}

export async function getPostsQuery(handle = {}) {
  const posts = await prisma.Post.findMany(handle);
  return posts;
}

export async function getPosts() {
  const getCachedPosts = await PrismaUnstableCache(
    () => getPostsQuery(),
    undefined,
    [TAGS.posts],
    60
  );
  return getCachedPosts;
}
export async function getPostsView() {
  const getCachedPosts = getPostsQuery({
    include: {
      user: true,
      category: true,
    },
  });
  return getCachedPosts;
}

export async function getSimilarPosts(slug, categoryid) {
  const posts = await prisma.Post.findMany({
    where: {
      id_category: parseInt(categoryid),
      slug: {
        not: slug,
      },
    },
    include: {
      category: true,
      user: true,
    },
  });
  return posts;
}
export async function getRecentPosts() {
  const posts = await prisma.Post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      view: "desc",
    },
    take: 5,
  });
  return posts;
}

// export async function getPosts(currentPage, limit, search) {
//   const skip = (currentPage - 1) * limit;
//   if (search !== "") {
//     const data = await prisma.Post.findMany({
//       skip: skip,
//       take: limit,
//       where: {
//         noidung: {
//           search: search,
//         },
//         title: {
//           search: search,
//         },
//       },
//     });
//     return data;
//   }
//   const data = await prisma.Post.findMany({
//     skip: skip,
//     take: limit,
//   });
//   return data;
// }

export async function getToTalPagePosts(search, limit) {
  let data = null;
  if (search !== "") {
    data = await prisma.Post.count({
      where: {
        content: {
          search: search,
        },
        title: {
          search: search,
        },
      },
    });
  } else {
    data = await prisma.Post.count();
  }
  return Math.ceil(data / limit);
}

export async function getLatestPost() {
  const latestPost = await prisma.Post.findFirst({
    orderBy: {
      updatedAt: "desc",
    },
  });
  return latestPost;
}

export async function getPostDetail(slug) {
  const post = await prisma.Post.update({
    where: { slug },
    data: { view: { increment: 1 } },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return post;
}

export async function getPostOfUser(userId) {
  const post = await prisma.Post.findMany({
    include: {
      user: true,
    },
    where: {
      user: {
        id: userId,
      },
    },
  });
  return post;
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
        id_danhmuc: parseInt(formData.category),
      },
    });
    return post;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getComments(postid) {
  const comments = await prisma.PostComment.findMany({
    where: {
      id_post: postid,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return comments;
}

export async function createComment(comment) {
  try {
    const newComment = await prisma.PostComment.create({
      data: {
        name: comment.name,
        image: comment.image,
        content: comment.content,
        id_post: parseInt(comment.id_post),
      },
    });
    return newComment;
  } catch (err) {
    console.log(err);
    return null;
  }
}
