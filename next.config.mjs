/** @type {import('next').NextConfig} */
const nextConfig = {
  // The research page became /publications, and project pages moved out of it
  // to their own section. Old addresses keep working.
  async redirects() {
    return [
      { source: '/research/project/:slug', destination: '/projects/:slug', permanent: true },
      { source: '/research', destination: '/publications', permanent: true },
      { source: '/research/:slug', destination: '/publications/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
