import { IconBrandGithub } from "@tabler/icons-react";
import React from "react";

interface IntegrationMeta {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  installUrl: string;
  iconComponent: React.ReactNode;
}
const integrationMetaList: IntegrationMeta[] = [
  {
    slug: "github",
    name: "GitHub",
    description:
      "개발자들이 프로젝트를 공유하고 관리하는 웹 기반 버전관리시스템 호스팅 서비스",
    tags: ["VCS", "Activity"],
    installUrl: "/install/github",
    iconComponent: <IconBrandGithub size={"1em"} />,
  },
];

export default function Integrations() {
  return <></>;
}
