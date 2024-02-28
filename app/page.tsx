"use client";

import React, { useEffect, useState } from "react";
import { NextPageContext } from "next";
import MobileDetect from "mobile-detect";
import {
  useIsDesktopMedia,
  useIsMobileMedia,
  useIsTabletMedia,
} from "@/hooks/mediaQuery";
import { PageContext } from "@/app/hooks";
import {
  Anchor,
  AppShell,
  Button,
  Flex,
  Group,
  Image,
  Space,
  Text,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Background from "@/app/components/Background";
import Hero from "@/app/components/Hero";
import { Done, Down } from "@/app/components/Divider";
import Section from "@/app/components/Section";
import Partners from "@/app/components/Partners";
import PlanCard from "@/app/components/PlanCard";
import Inquire from "@/app/components/Inquire";
import Footer from "@/app/components/Footer";
import {
  InquireCompletedModal,
  NotReadyYetModal,
} from "@/app/components/Modal";
import LandingPageShell from "@/app/components/LandingPageShell";
import useTallyInquireForm from "@/hooks/tally";

Page.getInitialProps = async (ctx: NextPageContext) => {
  const defaultProps = { isDesktop: true, isTablet: false, isMobile: false };
  if (ctx.req && ctx.req.headers["user-agent"] !== undefined) {
    const md = new MobileDetect(ctx.req.headers["user-agent"]);
    const isTablet = !!md.tablet();
    const isMobile = !!md.mobile();

    return {
      isDesktop: !isTablet && !isMobile,
      isTablet: isTablet,
      isMobile: isMobile,
    };
  }
  return defaultProps;
};
export default function Page(userAgent: any) {
  const isDesktopMedia = useIsDesktopMedia(userAgent.isDesktop);
  const isTabletMedia = useIsTabletMedia(userAgent.isTablet);
  const isMobileMedia = useIsMobileMedia(userAgent.isMobile);

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const moveToHashAnchor = () => {
    if (window.location.hash) {
      const hashAnchor = document.getElementById(
        window.location.hash.replace("#", ""),
      );
      if (hashAnchor !== null) {
        const y = hashAnchor.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const [notReadyYetModalOpened, notReadyYetModal] = useDisclosure(false);
  const [isInquireCompletedModalOpened, inquireCompletedModal] =
    useDisclosure(false);
  const [inquireEmail, setInquireEmail] = useState<string>("");
  const { tallyOptions, setTallyOptions, openTallyPopup } = useTallyInquireForm(
    {
      onSubmit: () => inquireCompletedModal.open(),
    },
  );
  useEffect(() => {
    const newOptions = Object.assign(tallyOptions, {
      hiddenFields: { email: inquireEmail },
    });
    setTallyOptions(newOptions);
  }, [tallyOptions, inquireEmail, setTallyOptions]);
  const [isInquireFocusTrapActive] = useDisclosure(false);

  return (
    <LandingPageShell
      onLoginClick={() => notReadyYetModal.open()}
      onInquireClick={() => openTallyPopup()}
    >
      <PageContext.Provider
        value={{
          userAgent: {
            isDesktop: isDesktopMedia ?? true,
            isMobile: isTabletMedia ?? false,
            isTablet: isMobileMedia ?? false,
          },
        }}
      >
        <Transition
          mounted={isMounted}
          transition="fade"
          duration={400}
          timingFunction="ease"
          onEntered={() => moveToHashAnchor()}
        >
          {(styles) => (
            <>
              <AppShell.Main pb={0} px={0} style={styles}>
                <Background />
                <Hero
                  inquireEmail={inquireEmail}
                  onInquireEmailChange={(text) => setInquireEmail(text)}
                  onInquireClick={() => openTallyPopup()}
                />
                <Group justify={"center"} px={"1em"}>
                  <Image
                    radius="md"
                    src="/images/landing-page-01.png"
                    w={"100%"}
                    maw={"1080px"}
                    alt={"프루퍼 대시보드"}
                  />
                </Group>
                <Down
                  py={"5em"}
                  bg={
                    "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 63%)"
                  }
                  top={"-3em"}
                  style={{
                    position: "relative",
                    borderTop: "1px solid var(--color-lightgray-2)",
                  }}
                />
                <Section
                  question={"프루퍼는 무엇을 할 수 있나요?"}
                  answer={"성과를 측정/평가/개선합니다"}
                  description={
                    "개발자의 업무성과에 대한 가시성을 확보하고 비즈니스 목표와의 연계를 이해합니다. 실리콘밸리에서 연구 및 검증된 DORA Metrics, SPACE Framework, DevEx Framework 를 포함한 여러 개발자 성과 측정 프레임워크를 통해 평가하여 최종적으로 개선까지 유도합니다."
                  }
                >
                  <Image
                    radius="md"
                    src="/images/landing-page-02.png"
                    w={"100%"}
                    maw={"1080px"}
                    alt={"성과를 측정/평가/개선합니다"}
                  />
                </Section>
                <Down py={"5em"} />
                <Section
                  question={"따로 준비해야 할게 있나요?"}
                  answer={"프루퍼 통합 시스템"}
                  description={
                    "프루퍼는 실무에서 사용되는 여러 엔지니어링 서비스들과 통합되어 하나의 서비스처럼 동작합니다. 성과정보를 일일히 입력할 필요 없이 단 한번의 연동만으로 시작할 수 있습니다!"
                  }
                >
                  <Image
                    radius="md"
                    src="/images/landing-page-03.png"
                    w={"100%"}
                    maw={"1080px"}
                    alt={"프루퍼 통합 시스템"}
                  />
                </Section>
                <Down py={"5em"} />
                <Section
                  question={"사용하면 뭐가 좋아지나요?"}
                  answer={"정확한 데이터에 기반한 성과 가시화"}
                  description={
                    "명확한 성과 평가와 공정한 인센티브 제공을 가능하게 하여 개발자의 동기 부여와 만족도를 향상 시킵니다. 또한, 팀 내 역량 강화와 효율적인 자원 배분을 촉진하여 전반적인 프로젝트 관리의 효율성을 높여 개인과 조직의 성장을 동시에 효과적으로 지원할 수 있습니다."
                  }
                >
                  <Image
                    radius="md"
                    src="/images/landing-page-04.png"
                    w={"100%"}
                    maw={"1080px"}
                    alt={"정확한 데이터에 기반한 성과 가시화"}
                  />
                </Section>
                <Down py={"5em"} />
                <Section
                  question={"어떻게 그게 가능한가요?"}
                  answer={"인사이트 알고리즘"}
                  description={
                    "이미 사용중인 어플리케이션에서 업무를 진행하며 생산되는 데이터들을 자동으로 수집하고\n" +
                    "프루퍼의 알고리즘을 통해 성과평가에 도움이 되는 인사이트를 추출하여 데이터의 가치를 극대화합니다."
                  }
                >
                  <Image
                    radius="md"
                    src="/images/landing-page-05.png"
                    w={"100%"}
                    maw={"1080px"}
                    alt={"인사이트 알고리즘"}
                  />
                </Section>
                <Down py={"5em"} />
                <Section title={"다 함께 건강한 문화를 만들어 가고 있습니다."}>
                  <Partners />
                </Section>
                <Down py={"5em"} id={"price"} />
                <Section
                  question={"우리도 사용해볼 수 있나요?"}
                  answer={"서비스 제공 플랜"}
                  description={
                    "사용하게 될 개발팀 규모에 꼭 맞는 요금제를 선택해보세요.\n" +
                    "물론 먼저 무료로 사용해보시고 결정해도 늦지 않습니다."
                  }
                >
                  <Flex
                    direction={
                      isMobileMedia
                        ? "column"
                        : isTabletMedia
                          ? "column"
                          : "row"
                    }
                    gap={"1em"}
                    align={"start"}
                    justify={"normal"}
                  >
                    <PlanCard
                      flex={1}
                      name={"Free"}
                      price={0}
                      description={
                        "프루퍼의 다양한 기능들을 무료로 먼저 사용해보세요!"
                      }
                      items={[
                        "사용자 4명 이하",
                        "생성 가능한 워크스페이스: 1개",
                        "워크스페이스 당 프로젝트: 1개",
                        "프로젝트 당 인스턴스: 1개",
                        "사용기한 무제한",
                        "기능 자동 업데이트",
                      ]}
                      cta={
                        <Button
                          fullWidth
                          variant={"outline"}
                          size={"md"}
                          onClick={() => openTallyPopup()}
                        >
                          무료로 사용해보기
                        </Button>
                      }
                    />
                    <PlanCard
                      flex={1}
                      name={"Professional"}
                      price={48000}
                      description={
                        "인하우스 개발팀을 보유 및 관리하고 있는 기업에 적합한 플랜입니다."
                      }
                      items={[
                        "사용자 50명 이하",
                        "생성 가능한 워크스페이스: 5개",
                        "워크스페이스 당 프로젝트: 30개",
                        "프로젝트 당 인스턴스: 8개",
                        "사용기한 무제한",
                        "기능 자동 업데이트",
                      ]}
                      cta={
                        <Button
                          fullWidth
                          size={"md"}
                          onClick={() => openTallyPopup()}
                        >
                          플랜 신청하기
                        </Button>
                      }
                    />
                    <PlanCard
                      flex={1}
                      name={"Enterprise"}
                      onInquireClick={() => openTallyPopup()}
                      description={
                        "서비스를 제한 없이 사용, 프루퍼 팀의 기술 지원을 통해 긴밀하게 협업합니다."
                      }
                      items={[
                        "사용자 무제한",
                        "생성 가능한 워크스페이스 무제한",
                        "워크스페이스 당 프로젝트 무제한",
                        "프로젝트 당 인스턴스 무제한",
                        "사용기한 무제한",
                        "기능 자동 업데이트",
                        "프루퍼 팀 기술 지원",
                      ]}
                      cta={
                        <Button
                          fullWidth
                          variant={"outline"}
                          size={"md"}
                          onClick={() => openTallyPopup()}
                        >
                          도입 문의하기
                        </Button>
                      }
                    />
                  </Flex>
                </Section>
                <Done py={"5em"} />
                <Inquire
                  isActive={isInquireFocusTrapActive}
                  inquireEmail={inquireEmail}
                  onInquireEmailChange={(text) => setInquireEmail(text)}
                  onInquireClick={() => openTallyPopup()}
                />
                <Space h={"20vh"} />
              </AppShell.Main>
              <AppShell.Footer
                pos={"static"}
                bg={"transparent"}
                style={{ border: "none" }}
              >
                <Footer
                  linkGroups={{
                    프루퍼: [
                      <Text key={0} onClick={() => notReadyYetModal.open()}>
                        About 프루퍼
                      </Text>,
                      <Text key={1} onClick={() => openTallyPopup()}>
                        문의 & 지원
                      </Text>,
                      <Anchor
                        key={2}
                        href="/docs/terms-of-service"
                        underline="never"
                        c={"black"}
                      >
                        서비스이용약관
                      </Anchor>,
                      <Anchor
                        key={3}
                        href="/docs/privacy"
                        underline="never"
                        c={"black"}
                      >
                        개인정보처리방침
                      </Anchor>,
                    ],
                    바로가기: [
                      <Text key={0} onClick={() => openTallyPopup()}>
                        무료로 체험해보기
                      </Text>,
                      <Anchor
                        key={1}
                        href="#price"
                        underline="never"
                        c={"black"}
                      >
                        가격
                      </Anchor>,
                      <Anchor
                        key={2}
                        href="/docs/introduction-of-proofer"
                        underline="never"
                        c={"black"}
                      >
                        서비스 소개
                      </Anchor>,
                    ],
                  }}
                />
              </AppShell.Footer>
            </>
          )}
        </Transition>
      </PageContext.Provider>
      <InquireCompletedModal
        isOpened={isInquireCompletedModalOpened}
        onCloseClick={inquireCompletedModal.close}
      />
      <NotReadyYetModal
        isOpened={notReadyYetModalOpened}
        onCloseClick={notReadyYetModal.close}
      />
    </LandingPageShell>
  );
}
