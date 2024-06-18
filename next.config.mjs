import { withSentryConfig } from "@sentry/nextjs";
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

export default withSentryConfig(
  withPWAAnalyzer(
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
      images: {
        domains: ["proofer.tech", "miro.medium.com"],
      },
      async redirects() {
        return [
          {
            source: "/with-cto/join",
            destination:
              "https://proofer-tech.notion.site/with-CTO-2nd-meet-6a871a3f90544e3bbab5a92fd5eea0ab?pvs=4",
            permanent: false,
          },
        ];
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
  ),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: "hsol",
    project: "proofer-represent",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
);
