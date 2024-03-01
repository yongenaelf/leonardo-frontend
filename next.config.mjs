/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
