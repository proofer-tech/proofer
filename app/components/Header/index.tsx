import {
  AppShell,
  Burger,
  Button,
  Flex,
  Group,
  Image,
  SimpleGrid,
  Space,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import styles from "./style.module.css";
import React from "react";

interface Menu {
  title: string;
  onClick: () => void;
}

interface HeaderProps {
  isNavbarOpened: boolean;
  onBurgerClick: () => void;
}

export default function Header({ isNavbarOpened, onBurgerClick }: HeaderProps) {
  const menus: Menu[] = [
    {
      title: "가격",
      onClick: () => {},
    },
    {
      title: "서비스 소개",
      onClick: () => {},
    },
    {
      title: "회사 소개",
      onClick: () => {},
    },
  ];

  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Group justify="space-between" style={{ flex: 1 }}>
            <Button variant={"transparent"}>
              <Image
                src="/images/branding.svg"
                width={30}
                height={30}
                alt="프루퍼 로고"
              />
            </Button>
            <Group justify="space-between" style={{ flex: 1 }}>
              <Group ml="xl" gap={0} visibleFrom="sm">
                {menus.map((menu, idx) => (
                  <Button
                    color="var(--color-foreground)"
                    variant="transparent"
                    key={`${menu.title}-${idx}`}
                    className={styles.control}
                    onClick={menu.onClick}
                  >
                    {menu.title}
                  </Button>
                ))}
              </Group>
              <Group visibleFrom="sm">
                <Button variant="subtle">로그인</Button>
                <Button>무료상담 신청</Button>
              </Group>
            </Group>
          </Group>
          <Burger
            opened={isNavbarOpened}
            onClick={onBurgerClick}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar py="md" px={4}>
        <Stack gap={"xs"}>
          {menus.map((menu, idx) => (
            <Button
              color="var(--color-foreground)"
              variant="subtle"
              key={`${menu.title}-${idx}`}
              className={styles.control}
              onClick={menu.onClick}
            >
              {menu.title}
            </Button>
          ))}
        </Stack>
        <Space h="xl" />
        <Button variant="subtle">로그인</Button>
      </AppShell.Navbar>
    </>
  );
}
