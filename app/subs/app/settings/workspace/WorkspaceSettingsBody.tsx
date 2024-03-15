import React, { useContext, useState } from "react";
import AppContext from "@/app/subs/app/contexts/AppContext";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import {
  Button,
  Fieldset,
  Group,
  LoadingOverlay,
  Space,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { generateAppPath } from "@/src/path";
import { useRouter } from "next/navigation";

export default function WorkspaceSettingsBody() {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(!appContext.isMounted);

  const onSubmit = (values: any) => {
    if (appContext.workspace === undefined) return;
    setIsLoading(true);

    fetch(
      generateAppPath(`/${appContext.workspace.instance.slug}/api/workspace`),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    )
      .then(async (response) => {
        if (appContext.workspace === undefined) return;
        if (response.ok) {
          const beforeInstance = Object.assign(
            {},
            appContext.workspace.instance,
          );
          appContext.workspace.instance = Object.assign(
            appContext.workspace.instance,
            form.values,
          );

          router.push(
            window.location.href.replace(
              beforeInstance.slug,
              form.values.slug || beforeInstance.slug,
            ),
          );
        }
      })
      .catch((reason) => form.setErrors(reason))
      .finally(() => setIsLoading(false));
  };

  const slugRuleText = "알파벳 소문자 또는 특수문자 '-'";
  const form = useForm({
    initialValues: {
      title: appContext.workspace?.instance.title,
      slug: appContext.workspace?.instance.slug,
    },
    validate: {
      title: (value) =>
        value === "" ? "워크스페이스 이름을 입력해주세요." : null,
      slug: (value) =>
        value === ""
          ? "워크스페이스 식별자를 입력해주세요."
          : /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value!)
            ? null
            : `${slugRuleText} 만 입력 가능합니다.`,
    },
  });

  if (appContext?.workspace === undefined) {
    return <NeedToSelectWorkspace serviceName={"워크스페이스 설정"} />;
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
      <Stack w={"100%"}>
        <Fieldset legend="기본정보">
          <TextInput
            label="워크스페이스 이름"
            placeholder="이름을 입력해주세요."
            {...form.getInputProps("title")}
            onBlur={() => form.validate()}
          />
          <Space h={"1em"} />
          <TextInput
            label="식별자"
            placeholder="URL 식별자를 입력해주세요."
            description={`(${slugRuleText})`}
            {...form.getInputProps("slug")}
          />
        </Fieldset>
        <Group justify={"end"}>
          <Button
            type={"submit"}
            size={"xs"}
            color={"gray"}
            variant={"outline"}
          >
            저장
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
