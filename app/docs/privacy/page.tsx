import React from "react";
import { getCachedPrivacyPage } from "@/src/notionPage";

export default async function PrivacyPage() {
  const { title, html } = await getCachedPrivacyPage();
  return (
    <div className="mx-auto w-full max-w-[1184px] px-4">
      <div className="flex flex-col gap-4 py-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div
          className="flex flex-col gap-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-bold [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-blue-600 [&_a]:underline [&_table]:border-collapse [&_td]:border [&_td]:p-2 [&_th]:border [&_th]:p-2"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
