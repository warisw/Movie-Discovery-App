/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  images: {
    domains: ["image.tmdb.org"],
  },
};
export default nextConfig;
