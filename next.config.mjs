import bundleAnalyzer from "@next/bundle-analyzer";
import pwaAnalyzer from "next-pwa";
import dayjs from "dayjs";
import "dayjs/locale/en.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import duration from "dayjs/plugin/duration.js";

dayjs.locale("ko");
dayjs.extend(customParseFormat);
dayjs.extend(duration);

const withPWAAnalyzer =
  process.env.VERCEL_ENV === "production"
    ? pwaAnalyzer({
        dest: "public",
      })
    : (config) => config;

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withPWAAnalyzer(
  withBundleAnalyzer({
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
    async rewrites() {
      return [
        {
          source: "/medium/:slug*",
          destination: "https://medium.com/proofer-blog/:slug*",
        },
        {
          source: "/subscribe",
          destination:
            "https://medium.com/proofer-blog/newsletters/measurable-developer",
        },
      ];
    },
  }),
);
