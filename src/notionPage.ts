import { cached } from "@/src/redis";
import NotionPageToHtml from "notion-page-to-html";

export const getPageContent = async function (pageId: string) {
  const { title, html } = await NotionPageToHtml.convert(
    `https://www.notion.so/${pageId}`,
    { bodyContentOnly: true },
  );
  return {
    title,
    html,
  };
};

export const getCachedTermsOfServicePage = cached(
  "getTermsOfServicePage",
  async function () {
    const { title, html } = await getPageContent(
      "2e72bebfdc21800ea186d1cdb0ed9d2c",
    );
    return {
      title,
      html,
    };
  },
  { ex: 60 * 60 * 24 },
);

export const getCachedPrivacyPage = cached(
  "getPrivacyPage",
  async function () {
    const { title, html } = await getPageContent(
      "2e72bebfdc21808098b6c363467653b8",
    );
    return {
      title,
      html,
    };
  },
  { ex: 60 * 60 * 24 },
);
