import React, { useContext } from "react";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import { Center, Stack, Text, Title } from "@mantine/core";
import { IconSunset } from "@tabler/icons-react";

export default function MemberSettingsBody() {
  const { workspace } = useContext(ProoferInsightContext);
  if (workspace === undefined) {
    return <NeedToSelectWorkspace serviceName={"워크스페이스 설정"} />;
  }

  return (
    <Center w={"100%"}>
      <Stack align={"center"} c={"var(--mantine-color-gray-6"} py={"2em"}>
        <IconSunset size={"3em"} />
        <Stack w={"100%"} align={"center"}>
          <Title order={3} ta={"center"}>
            준비중입니다.
          </Title>
          <Text ta={"center"}>
            워크스페이스의 멤버를 추가하고, 수정할 수 있는 설정 페이지입니다.
          </Text>
          <Text ta={"center"}>
            지금 이 기능은 준비중이오니 워크스페이스를 볼 수 있는 권한을 추가로
            부여하고 싶으시다면 채널톡을 통해 문의해주세요.
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
}
