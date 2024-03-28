export function generateManifest(
  title: string,
  shortTitle: string,
  description: string,
) {
  const fullTitle = [title, shortTitle].filter((v) => v).join(" | ");
  return {
    applicationName: title,
    metadataBase: new URL("https://proofer.tech"),
    title: fullTitle,
    description: description,
    keywords: [
      "프루퍼",
      "개발자 성과",
      "Developer Velocity",
      "DORA Metrics",
      "SPACE Framework",
      "DevEx",
      "proofer",
      "proofer tech",
    ],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://proofer.tech",
      siteName: title,
      title: fullTitle,
      description: description,
      images: ["/assets/images/og-image.png"],
    },
  };
}
