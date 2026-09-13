/** @type {import('next').NextConfig} */
const nextConfig = {
  // Project pages moved from the research page to their own section.
  async redirects() {
    return [
      { source: '/research/project/:slug', destination: '/projects/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
