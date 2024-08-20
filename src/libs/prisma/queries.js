import prisma from "./prisma";

export async function getCategoriesQuery() {
  return await prisma.Category.findMany();
}

export async function getPostsQuery() {
  const posts = prisma.Post.findMany({
    include: {
      user: true,
      category: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return posts;
}

export async function getTopViewedPostsQuery(sevenDaysAgo, now) {
  const topViewedPosts = await prisma.Post.findMany({
    where: {
      updatedAt: {
        gte: sevenDaysAgo,
        lte: now,
      },
    },
    include: {
      user: true,
      category: true,
    },
    orderBy: {
      view: "desc",
    },
    take: 9,
  });
  return topViewedPosts;
}

export async function getSimilarPostsQuery(slug, categoryid) {
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
export async function getRecentPostsQuery() {
  const posts = await prisma.Post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
  });
  return posts;
}

export async function getCommentsQuery(postid) {
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

export async function createCommentQuery(comment) {
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

export async function getPostDetailQuery(slug) {
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

export async function getPostsWithParamsQuery(skip, limit, search = null) {
  const data = await prisma.Post.findMany({
    skip: skip,
    take: limit,
    where: {
      content: {
        search: search,
      },
      title: {
        search: search,
      },
    },
    include: {
      user: true,
      category: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return data;
}

export async function getPostByCategoryQuery(categorySlug, skip, limit) {
  const posts = await prisma.Post.findMany(
    categorySlug
      ? {
          skip: skip,
          take: limit,
          where: {
            category: {
              slug: categorySlug,
            },
          },
          include: {
            category: true,
            user: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        }
      : {
          skip: skip,
          take: limit,
          include: {
            category: true,
            user: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        }
  );
  return posts;
}

export async function getToTalPagePostsQuery(search, limit) {
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
export async function getToTalPagePostsByCategoryQuery(categorySlug, limit) {
  const data = await prisma.Post.count(
    categorySlug
      ? {
          where: {
            category: {
              slug: categorySlug,
            },
          },
        }
      : undefined
  );
  return Math.ceil(data / limit);
}

export async function getPostOfUserQuery(userId) {
  const post = await prisma.Post.findMany({
    where: {
      user: {
        id: userId,
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return post;
}
export async function removePostQuery(postid) {
  const deletePost = await prisma.$transaction(async (prisma) => {
    await prisma.PostComment.deleteMany({
      where: {
        id_post: parseInt(postid),
      },
    });
    await prisma.Post.delete({
      where: {
        id: postid,
      },
    });
  });
  return deletePost;
}
