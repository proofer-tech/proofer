import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  sassOptions: {
    prependData: `@import "./_mantine.scss";`,
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: 'https://medium.com/@proofer.tech',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: 'https://medium.com/@proofer.tech/:slug*',
        permanent: true,
      },
    ]
  },
});
