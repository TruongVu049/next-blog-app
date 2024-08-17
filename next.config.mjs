/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "",
  //       port: "",
  //       pathname: "**",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "avatars.githubusercontent.com",
  //       port: "",
  //       pathname: "**",
  //     },

  //   ],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
