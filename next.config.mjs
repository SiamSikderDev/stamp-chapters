/** @type {import('next').NextConfig} */
const nextConfig = {
  // No remote images needed; keep the config minimal.
  images: {
    // mascot.png / logo.png are served locally from /public
    unoptimized: false,
  },
};

export default nextConfig;
