import {
  AspectRatio,
  BackgroundImage,
  Card,
  CardSection,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";

interface BlogCardProps {
  thumbnail: string;
  title: string;
  description: string;
}
export default function BlogCard({
  thumbnail,
  title,
  description,
}: BlogCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <CardSection p={0}>
        <BackgroundImage src={thumbnail}>
          <AspectRatio ratio={1200 / 630}></AspectRatio>
        </BackgroundImage>
      </CardSection>
      <Stack py={"md"}>
        <Title order={5}>{title}</Title>
        <Text size={"sm"}>{description}</Text>
      </Stack>
    </Card>
  );
}
