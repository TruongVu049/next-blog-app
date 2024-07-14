/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.galaxycine.vn",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/next-blog-app-21b73.appspot.com/**",
      },
    ],
  },
};

export default nextConfig;
