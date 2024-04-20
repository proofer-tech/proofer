"use client";
import { Group } from "@mantine/core";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import React from "react";

export default function ShareIcons({ url }: { url: string }) {
  return (
    <Group justify={"end"}>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <FacebookShareButton
        url={url}
        quote={`페이스북으로 이 글을 공유해보세요!`}
        hashtag={"#프루퍼 #성과평가 #개발자평가 #데이터HR"}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </Group>
  );
}
