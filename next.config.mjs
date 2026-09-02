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

/* 빌드가 이 파일과 무관한 자리에서 깨지면(프리렌더 InvariantError,
 * `TypeError: generate is not a function`, `path` 인자가 undefined 등) 이 파일을 먼저
 * 의심하지 않는다. `next/dist/server/config.js`의 `loadConfig`는 환경변수
 * `__NEXT_PRIVATE_STANDALONE_CONFIG`가 있으면 이 파일을 아예 읽지 않고 그 JSON을 그대로
 * 최종 설정으로 쓴다. `output: "standalone"`으로 구운 서버가 자기 자신에게 심는 런타임
 * 전용 값이라서, 그런 서버를 조상 프로세스로 둔 셸에서 빌드를 돌리면 상속으로 새어 든다.
 * JSON은 함수를 담지 못하므로 여기서 넘기는 `webpack`, `rewrites`와 Sentry, PWA 래퍼가
 * 통째로 빠지고, 무엇이 먼저 깨지는지는 새어 든 JSON 내용에 따라 매번 달라진다.
 *
 * 그래서 `package.json`의 `build`와 `analyze`가 이 변수를 `unset`하고 시작한다. 지우는
 * 자리를 여기가 아니라 거기에 둔 것은, 이 변수가 있으면 이 파일 자체가 로드되지 않아
 * 여기서 막아도 이미 늦기 때문이다. 검증할 때는 `pnpm build`로 돌린다 - `npx next build`를
 * 직접 부르면 그 `unset`을 지나지 않는다. */
export default withSentryConfig(
  withPWAAnalyzer(
    withBundleAnalyzer({
      reactStrictMode: false,
      turbopack: {
        root: import.meta.dirname,
      },
      experimental: {
        optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
      },
      sassOptions: {
        // sass options
      },
      serverExternalPackages: ["canvas", "pdfjs-dist"],
      webpack: (config, ..._) => {
        // @ts-ignore
        config.externals.push({ canvas: "commonjs canvas" });
        return config;
      },
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "proofer.tech",
          },
          {
            protocol: "https",
            hostname: "miro.medium.com",
          },
          {
            protocol: "https",
            hostname: "asgkzse2rqmcnxxg.public.blob.vercel-storage.com",
          },
        ],
      },
      async rewrites() {
        return [];
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

    webpack: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      treeshake: {
        removeDebugLogging: true,
      },

      // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
    },
  },
);
