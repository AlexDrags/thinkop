/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'celes.club',
        port: '',
        pathname: '/uploads/posts/**',
      },
    ],
  },
};

module.exports = nextConfig;
