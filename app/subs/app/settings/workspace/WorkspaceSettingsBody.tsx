"use client";
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
import { useListState } from "@mantine/hooks";

export default function WorkspaceSettingsBody() {
  const router = useRouter();
  const { close, triggered, trigger } = useContext(SettingsModalContext);
  const { workspace, isMounted } = useContext(ProoferInsightContext);
  const [isLoading, setIsLoading] = useState<boolean>(!isMounted);
  const [delayedJobs, delayedJobHandler] = useListState<() => Promise<any>>([]);

  const [logoUrl, setLogoUrl] = useState<string>(workspace?.instance.logo_url!);

  const slugRuleText = "Only lowercase alphabets or the special character '-'";
  const form = useForm({
    initialValues: {
      name: workspace?.instance.name,
      slug: workspace?.instance.slug,
      logo_url: new File([], logoUrl?.split("/").pop()?.slice(-32) || ""),
    },
    validate: {
      name: (value) => (value === "" ? "Please enter a workspace name." : null),
      slug: (value) =>
        value === ""
          ? "Please enter a workspace identifier."
          : /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value!)
            ? null
            : `Only ${slugRuleText} are allowed.`,
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
    fetch(generateAppPath("/api/workspace", workspace.instance.slug), {
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
          setLogoUrl(data.logo_url);

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
        delayedJobHandler.append(async () => close());
        form.onSubmit(onSubmit)();
        break;
    }
    trigger("");
  }, [triggered]);

  useEffect(() => {
    function delayedJobQueueTraveler() {
      const delayedJob = delayedJobs.shift();
      if (delayedJob)
        delayedJob()
          .then(() => delayedJobHandler.shift())
          .finally(() => delayedJobQueueTraveler());
    }
    if (!isLoading) delayedJobQueueTraveler();
  }, [isLoading]);

  return workspace === undefined ? (
    <NeedToSelectWorkspace serviceName={"Workspace Settings"} />
  ) : (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={100}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
      <Fieldset legend="Basic Information">
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
            label="Workspace Logo Image"
            description={"A square image with a 1:1 ratio is recommended."}
            placeholder={logoUrl?.split("/").pop()?.slice(-32)}
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
          label="Workspace Name"
          placeholder="Please enter a name."
          {...form.getInputProps("name")}
          onBlur={() => form.validate()}
        />
        <Space h={"1em"} />
        <TextInput
          label="Identifier"
          placeholder="Please enter a URL identifier."
          description={`(${slugRuleText})`}
          {...form.getInputProps("slug")}
        />
      </Fieldset>
    </form>
  );
}
