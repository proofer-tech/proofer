import { cached } from "@/src/redis";
import NotionPageToHtml from "notion-page-to-html";

export const getCachedTermsOfServicePage = cached(
  async function getTermsOfServicePage() {
    const { title, html } = await NotionPageToHtml.convert(
      "https://www.notion.so/d9127501250a4a3bb1002f6792593d3e",
      { bodyContentOnly: true },
    );
    return {
      title,
      html,
    };
  },
  { ex: 60 * 60 * 24 },
);

export const getCachedPrivacyPage = cached(
  async function getPrivacyPage() {
    const { title, html } = await NotionPageToHtml.convert(
      "https://www.notion.so/7f1752d2fb9c40f09c86ffc2cf1b74b3",
      { bodyContentOnly: true },
    );
    return {
      title,
      html,
    };
  },
  { ex: 60 * 60 * 24 },
);
