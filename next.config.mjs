import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  sassOptions: {
    prependData: `@import "./_mantine.scss";`,
  },
  webpack: (config, ..._) => {
    // @ts-ignore
    config.externals.push({ canvas: "commonjs canvas" });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "asgkzse2rqmcnxxg.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/medium/:slug*",
        destination: "https://medium.com/@proofer.tech/:slug*",
      },
      {
        source: "/install/github",
        destination: "https://github.com/apps/proofer-tech/installations/new",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "https://medium.com/@proofer.tech",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "https://medium.com/@proofer.tech/:slug*",
        permanent: true,
      },
    ];
  },
});
