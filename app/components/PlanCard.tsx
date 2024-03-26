import {
  Box,
  Button,
  Card,
  CardProps,
  Divider,
  Group,
  Image,
  List,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import React, { useContext } from "react";
import { ElementProps } from "@mantine/core/lib/core";
import { PageContext } from "@/src/contexts";

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
  const pageCtx = useContext(PageContext);
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
          <Image src="/assets/images/card-head.png" alt="Norway" />
        </Box>
      </Card.Section>
      <Stack py={"1em"} gap={"1.3em"}>
        <Text
          fz={pageCtx.userAgent.isDesktop ? "1em" : "1.2em"}
          fw={700}
          c={"var(--color-primary)"}
        >
          {name}
        </Text>
        {price !== undefined && (
          <Stack gap={0}>
            {price > 0 && (
              <Text c={"var(--color-lightgray)"} size={"xs"}>
                (개발자 1인당)
              </Text>
            )}
            <Group align={"end"} gap={"0.3em"}>
              <Text fw={100} fz={"2em"} lh={1}>
                {price.toLocaleString("en-US")}원
              </Text>
              <Text lh={1.1}>/</Text>
              <Text lh={1.1}>월</Text>
            </Group>
          </Stack>
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
        {items.map((item, idx) => (
          <List.Item key={idx} fz={"0.8em"} c={"var(--color-darkgray-2)"}>
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
