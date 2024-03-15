import React, { useContext } from "react";
import AppContext from "@/app/subs/app/contexts/AppContext";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import { Button, Fieldset, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { generateAppPath } from "@/src/path";
import { useRouter } from "next/navigation";

export default function WorkspaceSettingsBody() {
  const router = useRouter();
  const appContext = useContext(AppContext);

  const onSubmit = (values: any) => {
    if (appContext.workspace === undefined) return;

    fetch(
      generateAppPath(`/${appContext.workspace.instance.slug}/api/workspace`),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.workspace_title,
        }),
      },
    )
      .then(async (response) => {
        if (appContext.workspace === undefined) return;
        if (response.ok) {
          appContext.workspace.instance.title = form.values.workspace_title!;
          router.refresh();
        }
      })
      .catch((reason) => form.setErrors(reason));
  };
  const form = useForm({
    initialValues: {
      workspace_title: appContext.workspace?.instance.title,
    },
    validate: {
      workspace_title: (value) =>
        value === "" ? "워크스페이스 이름을 입력해주세요." : null,
    },
  });

  if (appContext?.workspace === undefined) {
    return <NeedToSelectWorkspace serviceName={"워크스페이스 설정"} />;
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack w={"100%"}>
        <Fieldset legend="기본정보">
          <TextInput
            label="워크스페이스 이름"
            placeholder="이름을 입력해주세요."
            {...form.getInputProps("workspace_title")}
            onBlur={() => form.validate()}
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
