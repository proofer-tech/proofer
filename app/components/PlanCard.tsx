import {
  Badge,
  Card,
  Group,
  Image,
  Text,
  Button,
  CardProps,
  Box,
  Stack,
  Divider,
  List,
  Space,
} from "@mantine/core";
import React from "react";
import { ElementProps } from "@mantine/core/lib/core";

interface PlanCardProps extends CardProps, ElementProps<"div"> {
  name: string;
  price?: number;
  onInquireClick?: () => void;
  description: string;
  items: string[];
  cta?: React.ReactNode;
}

export default function PlanCard({
  name,
  price,
  onInquireClick,
  description,
  items,
  cta,
  ...props
}: PlanCardProps) {
  return (
    <Card
      w={"100%"}
      h={"100%"}
      shadow="sm"
      p={"2.8em"}
      radius="md"
      withBorder
      {...props}
    >
      <Card.Section>
        <Box w={"8em"} pos={"absolute"} right={"-4.2em"} top={"0.8em"}>
          <Image src="/images/card-head.png" alt="Norway" />
        </Box>
      </Card.Section>
      <Stack py={"1em"} gap={"1.3em"}>
        <Text fz={"1em"} fw={700} c={"var(--color-primary)"}>
          {name}
        </Text>
        {price !== undefined && (
          <Group align={"end"} gap={"0.3em"}>
            <Text fw={100} fz={"2em"} lh={1}>
              {price.toLocaleString("en-US")}원
            </Text>
            <Text lh={1.1}>/</Text>
            <Text lh={1.1}>월</Text>
          </Group>
        )}
        {onInquireClick && (
          <Box>
            <Button
              variant="outline"
              color={"var(--color-blue)"}
              fw={400}
              onClick={onInquireClick}
              size={"xs"}
            >
              문의하기
            </Button>
          </Box>
        )}
        <Text size="sm" c={"var(--color-darkgray-2)"}>
          {description}
        </Text>
      </Stack>
      <Divider />
      <List listStyleType="disc" py={"1em"} spacing={"0.3em"}>
        {items.map((item) => (
          <List.Item fz={"0.8em"} c={"var(--color-darkgray-2)"}>
            {item}
          </List.Item>
        ))}
      </List>
      {cta && (
        <>
          <Space h={"3em"} />
          {cta}
        </>
      )}
    </Card>
  );
}
