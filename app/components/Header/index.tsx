import {
  Anchor,
  AppShell,
  Burger,
  Button,
  Container,
  Group,
  Image,
  Space,
  Stack,
} from "@mantine/core";
import styles from "./style.module.css";
import React from "react";
import { useWindowScroll } from "@mantine/hooks";

interface Menu {
  title: string;
  onClick: () => void;
}

interface HeaderProps {
  isNavbarOpened: boolean;
  onBurgerClick: () => void;
  onMenuClick?: (index: number) => void;
  onLoginClick?: () => void;
  onInquireClick?: () => void;
}

export default function Header({
  isNavbarOpened,
  onBurgerClick,
  onMenuClick,
  onLoginClick,
  onInquireClick,
}: HeaderProps) {
  const [_, scrollTo] = useWindowScroll();
  const menus: Menu[] = [
    {
      title: "가격",
      onClick: () => onMenuClick && onMenuClick(0),
    },
    {
      title: "서비스 소개",
      onClick: () => onMenuClick && onMenuClick(1),
    },
  ];

  const onSpecificMenuClick = (menu: Menu) => {
    menu.onClick();
    onBurgerClick();
  };

  return (
    <>
      <AppShell.Header>
        <Container display={"flex"} h={"100%"}>
          <Group h="100%" px="md" style={{ flex: 1 }}>
            <Group justify="space-between" style={{ flex: 1 }}>
              <Anchor href={"/"} underline="never">
                <Button
                  variant={"transparent"}
                  style={{ width: "2em", height: "2em" }}
                  p={0}
                  onClick={() => scrollTo({ y: 0 })}
                >
                  <Image
                    src="/images/branding.svg"
                    alt="프루퍼 로고"
                    width={"100%"}
                  />
                </Button>
              </Anchor>
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
                <Button
                  variant="subtle"
                  visibleFrom="sm"
                  onClick={onLoginClick}
                >
                  로그인
                </Button>
              </Group>
            </Group>
            <Group>
              <Button onClick={onInquireClick}>무료상담 신청</Button>
              <Burger
                opened={isNavbarOpened}
                onClick={onBurgerClick}
                hiddenFrom="sm"
                size="sm"
              />
            </Group>
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Navbar py="md" px={4}>
        <Stack gap={"xs"}>
          {menus.map((menu, idx) => (
            <Button
              color="var(--color-foreground)"
              variant="subtle"
              key={`${menu.title}-${idx}`}
              className={styles.control}
              onClick={() => onSpecificMenuClick(menu)}
            >
              {menu.title}
            </Button>
          ))}
        </Stack>
        <Space h="xl" />
        <Button variant="subtle" onClick={onLoginClick}>
          로그인
        </Button>
      </AppShell.Navbar>
    </>
  );
}
