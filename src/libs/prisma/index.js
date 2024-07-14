import prisma from "./prisma";

export async function getCategory() {
  const data = await prisma.DanhMuc.findMany();
  return data;
}

export async function getPosts(currentPage, limit, search) {
  const skip = (currentPage - 1) * limit;
  if (search !== "") {
    const data = await prisma.baiViet.findMany({
      skip: skip,
      take: limit,
      where: {
        noidung: {
          search: search,
        },
        tieude: {
          search: search,
        },
      },
    });
    return data;
  }
  const data = await prisma.baiViet.findMany({
    skip: skip,
    take: limit,
  });
  return data;
}

export async function getToTalPagePosts(search, limit) {
  let data = null;
  if (search !== "") {
    data = await prisma.baiViet.count({
      where: {
        noidung: {
          search: search,
        },
        tieude: {
          search: search,
        },
      },
    });
  } else {
    data = await prisma.baiViet.count();
  }
  return Math.ceil(data / limit);
}

export async function getLatestPost() {
  const latestPost = await prisma.baiViet.findFirst({
    orderBy: {
      ngaytao: "desc",
    },
  });
  return latestPost;
}

export async function getTopPost() {
  const posts = await prisma.baiViet.findMany({
    where: {
      ngaytao: {
        gte: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000),
      },
    },
    orderBy: {
      luotxem: "desc",
    },
    take: 5,
  });
  return posts;
}

export async function getPostDetail(slug) {
  const post = await prisma.BaiViet.update({
    where: { slug },
    data: { luotxem: { increment: 1 } },
    //   include: { user: true },
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
    console.log(formData);
    const post = await prisma.BaiViet.create({
      data: {
        tieude: formData.title,
        noidung: formData.content,
        hinhanh: formData.image,
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
