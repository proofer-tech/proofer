"use client";
import Image from "next/image";
import Header from "@/app/components/Header";
import React, { useEffect, useState } from "react";
import LandingPageShell from "@/app/components/LandingPageShell";
import {
  AppShell,
  Center,
  Container,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Footer from "@/app/components/Footer";
import { redirect } from "next/navigation";

const magnifierComponents = [
  <Image
    key={1}
    src={"/assets/images/magnifier-1.png"}
    alt={"페이지를 찾는 사람"}
    width={240}
    height={240}
  />,
  <Image
    key={2}
    src={"/assets/images/magnifier-2.png"}
    alt={"페이지를 찾는 사람"}
    width={240}
    height={240}
  />,
  <Image
    key={3}
    src={"/assets/images/magnifier-3.png"}
    alt={"페이지를 찾는 사람"}
    width={240}
    height={240}
  />,
  <Image
    key={4}
    src={"/assets/images/magnifier-4.png"}
    alt={"페이지를 찾는 사람"}
    width={240}
    height={240}
  />,
];
export default function NotFound() {
  const [title, setTitle] = useState<string>("페이지를 찾는 중이에요.");
  const [description, setDescription] = useState<string>(
    "기술 블로그에 찾고 계시는 페이지가 있다면, 페이지로 연결될거에요.",
  );

  const [isFounded, setIsFounded] = useState<boolean>();
  const [magnifierComponent, setMagnifierComponent] = useState<React.ReactNode>(
    magnifierComponents[Math.floor(Math.random() * 4)],
  );

  useEffect(() => {
    const interval = setInterval(
      () =>
        setMagnifierComponent(
          magnifierComponents[Math.floor(Math.random() * 4)],
        ),
      500,
    );

    fetch(`/medium/${window.location.pathname}`)
      .then(async (response) => {
        if (response.status !== 200) return;
        const responseText = await response.text();
        setIsFounded(!responseText.includes("PAGE NOT FOUND"));
      })
      .finally(() => clearInterval(interval));
  }, []);

  const [countNumber, setCountNumber] = useState<number>();
  useEffect(() => {
    if (isFounded === true) {
      setTitle("페이지를 찾았어요!");
      setDescription(
        "잠시 후 프루퍼의 기술블로그 @proofer.tech 로 이동합니다.",
      );
      setCountNumber(3);
    } else if (isFounded === false) {
      setTitle("페이지를 찾을 수 없습니다.");
      setDescription(
        "혹시 찾고 계시는 페이지의 URL이 잘못 입력된건 아닌지 한번 더 확인해보세요.",
      );
    }
  }, [isFounded]);

  useEffect(() => {
    if (countNumber === undefined) return;
    else if (countNumber === 0)
      redirect(`https://medium.com/@proofer.tech${window.location.pathname}`);

    setTimeout(() => setCountNumber(countNumber - 1), 1000);
  }, [countNumber]);

  return (
    <LandingPageShell isNavbarOpened={false}>
      <Header
        isNavbarOpened={false}
        portals={[
          { title: "가격", href: "/#price" },
          { title: "서비스소개", href: "/docs/introduction-of-proofer" },
        ]}
      />
      <AppShell.Main>
        <Container>
          <Stack align={"center"}>
            <Space h={"3em"} />
            <Center>{magnifierComponent}</Center>
            <Title order={1} c={"var(--mantine-color-gray-8)"}>
              {title}
            </Title>
            <Text c={"var(--mantine-color-gray-6)"} ta={"center"}>
              {description}
            </Text>
            {countNumber !== undefined ? <Text>{countNumber}</Text> : ""}
          </Stack>
        </Container>
      </AppShell.Main>
      <AppShell.Footer pos={"static"} withBorder={false}>
        <Container>
          <Footer />
        </Container>
      </AppShell.Footer>
    </LandingPageShell>
  );
}
