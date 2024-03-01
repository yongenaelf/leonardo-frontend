/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.leonardo.ai",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
