const siteMetadata = {
  title: "vnblog Chia Sẻ Kiến Thức - Blog Đa Lĩnh Vực",
  description:
    "Nơi bạn có thể tự do viết và chia sẻ bài viết về mọi chủ đề. Tham gia blog cộng đồng để tìm kiếm thông tin, đọc bài viết hữu ích, và kết nối với người đọc cùng đam mê.",
  socialBanner: `${
    process.env.NEXT_PUBLIC_VERCEL_URL || ""
  }/static/images/twitter-card.png`,
  locale: "vi_VN",
};

export function genPageMetadata({ title, description, image, ...rest }) {
  return {
    title,
    description: description || siteMetadata.description,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: "./",
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: siteMetadata.locale,
      type: "website",
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: "summary_large_image",
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  };
}
