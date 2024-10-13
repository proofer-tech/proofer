import { AspectRatio, Group } from "@mantine/core";

export default function ServiceVideo() {
  return (
    <Group w={"100%"}>
      <AspectRatio ratio={560 / 345} w={"100%"}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Z49SLE-uKtU?si=p76wNbgWUGNsacUz"
          title="프루퍼 인사이트 서비스 소개영상"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{
            width: "100%",
            height: "100%",
            border: 0,
            borderRadius: "8px",
          }}
        ></iframe>
      </AspectRatio>
    </Group>
  );
}
