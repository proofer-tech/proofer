import React, { useContext, useEffect, useState } from "react";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import {
  BackgroundImage,
  Fieldset,
  FileInput,
  Group,
  LoadingOverlay,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { generateAppPath } from "@/src/path";
import { useRouter } from "next/navigation";
import { blobToBase64 } from "@/src/file";
import { SettingsModalContext } from "@/app/subs/app/settings/modal";

export default function WorkspaceSettingsBody() {
  const router = useRouter();
  const { close, triggered, trigger } = useContext(SettingsModalContext);
  const { workspace, isMounted } = useContext(ProoferInsightContext);
  const [isLoading, setIsLoading] = useState<boolean>(!isMounted);

  const [logoUrl, setLogoUrl] = useState<string>(workspace?.instance.logoUrl!);

  const slugRuleText = "알파벳 소문자 또는 특수문자 '-'";
  const form = useForm({
    initialValues: {
      name: workspace?.instance.name,
      slug: workspace?.instance.slug,
      logo_url: new File([], logoUrl.split("/").pop()?.slice(-32) || ""),
    },
    validate: {
      name: (value) =>
        value === "" ? "워크스페이스 이름을 입력해주세요." : null,
      slug: (value) =>
        value === ""
          ? "워크스페이스 식별자를 입력해주세요."
          : /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value!)
            ? null
            : `${slugRuleText} 만 입력 가능합니다.`,
    },
  });
  const onSubmit = async (values: any) => {
    if (workspace === undefined) return;
    setIsLoading(true);
    const formValues = Object.assign({}, values);
    if (values.logo_url instanceof File && values.logo_url.size > 0) {
      formValues.logo_url = await blobToBase64(values.logo_url);
    } else {
      delete formValues.logo_url;
    }
    fetch(generateAppPath(`/${workspace.instance.slug}/api/workspace`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then(async (response) => {
        if (workspace === undefined) return;
        if (response.ok) {
          const beforeInstance = Object.assign({}, workspace.instance);
          const data = await response.json();
          workspace.instance = Object.assign(workspace.instance, data);
          setLogoUrl(data.logoUrl);

          router.push(
            window.location.href.replace(beforeInstance.slug, data.slug),
          );
          setTimeout(() => router.refresh(), 1);
        }
      })
      .catch((reason) => form.setErrors(reason))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    switch (triggered) {
      case "cancel":
        form.reset();
        close();
        break;
      case "save":
        form.onSubmit(onSubmit)();
        break;
      case "submit":
        form.onSubmit(onSubmit)();
        close();
        break;
    }
    trigger("");
  }, [triggered]);

  return workspace === undefined ? (
    <NeedToSelectWorkspace serviceName={"워크스페이스 설정"} />
  ) : (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={100}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
      <Fieldset legend="기본정보">
        <Group wrap={"nowrap"} align={"center"}>
          <BackgroundImage
            src={logoUrl}
            radius="sm"
            w={"4em"}
            h={"4em"}
            style={{
              flexShrink: 0,
              border: "1px solid var(--mantine-color-gray-3)",
            }}
          />
          <FileInput
            label="워크스페이스 로고 이미지"
            description={"1:1 비율의 정사각형 이미지를 추천합니다."}
            placeholder={logoUrl.split("/").pop()?.slice(-32)}
            w={"100%"}
            {...form.getInputProps("logo_url")}
            onChange={(file) => {
              const originProps = form.getInputProps("logo_url");
              file && setLogoUrl(URL.createObjectURL(file));
              return originProps.onChange(file);
            }}
          ></FileInput>
        </Group>
        <Space h={"1em"} />
        <TextInput
          label="워크스페이스 이름"
          placeholder="이름을 입력해주세요."
          {...form.getInputProps("name")}
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
    </form>
  );
}
