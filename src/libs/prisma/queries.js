export async function getCategoriesQuery() {
  return await prisma.Category.findMany();
}
export async function getPostsQuery() {
  const posts = prisma.Post.findMany({
    include: {
      user: true,
      category: true,
    },
  });
  return posts;
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
      view: "desc",
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
