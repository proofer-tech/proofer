import React, { useContext } from "react";
import AppContext from "@/app/subs/app/contexts/AppContext";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import { Fieldset, Space, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function WorkspaceSettingsBody() {
  const appContext = useContext(AppContext);
  const form = useForm({
    initialValues: {
      workspace_slug: appContext.workspace?.instance.slug,
      workspace_title: appContext.workspace?.instance.title,
    },
  });

  if (appContext?.workspace === undefined) {
    return <NeedToSelectWorkspace title={"워크스페이스 설정"} />;
  }

  return (
    <Stack w={"100%"}>
      <Fieldset legend="기본정보">
        <TextInput
          label="워크스페이스 이름"
          placeholder="이름을 입력해주세요."
          {...form.getInputProps("workspace_title")}
        />
        <Space h={"1em"} />
        <TextInput
          label="식별자"
          placeholder="영문으로 된 식별자를 입력해주세요."
          description="(영문 알파벳 또는 특수문자 '-')"
          {...form.getInputProps("workspace_slug")}
        />
      </Fieldset>
    </Stack>
  );
}
