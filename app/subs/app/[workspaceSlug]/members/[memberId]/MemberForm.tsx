"use client";
import {
  ActionIcon,
  Button,
  CloseButton,
  Fieldset,
  FocusTrap,
  Group,
  Input,
  LoadingOverlay,
  Stack,
} from "@mantine/core";
import React, { useState } from "react";
import { InferSelectModel } from "drizzle-orm";
import {
  WorkspaceMember,
  WorkspaceMemberEmail,
} from "@/database/schemas/workspace";
import { useForm } from "@mantine/form";
import { IconMail, IconRowInsertBottom, IconXboxX } from "@tabler/icons-react";
import ThumbnailFileInput from "@/src/components/ThumbnailFileInput";
import { generateNextFormAction } from "@/src/utils/mantine";

interface FormValues {
  id: number;
  nickname: string;
  avatar_url: string;
  emails: string[];
}
interface MemberFormProps {
  member: InferSelectModel<typeof WorkspaceMember>;
  emails: InferSelectModel<typeof WorkspaceMemberEmail>[];
  handleSubmit: (formData: FormData) => Promise<void>;
}
export default function MemberForm({
  member,
  emails,
  handleSubmit,
}: MemberFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [focusedEmailIdx, setFocusedEmailIdx] = useState<number | null>(null);
  const form = useForm<FormValues>({
    initialValues: {
      id: member.id,
      nickname: member.nickname,
      avatar_url: member.avatar_url || "",
      emails: emails.map((email) => email.email),
    },
    validate: {
      id: (value) => (value !== member.id ? "ID 값을 수정하지 마세요." : null),
      nickname: (value) => (value === "" ? "이름을 입력해주세요." : null),
      emails: (value) => (value.length === 0 ? "이메일을 입력해주세요." : null),
    },
  });

  const addEmailItem = () => {
    form.insertListItem("emails", "");
    setFocusedEmailIdx(form.getInputProps("emails").value.length);
  };

  const onSubmit = async (formData: FormData) => {
    await generateNextFormAction(form, handleSubmit)(formData);
    setIsLoading(false);
  };

  return (
    <form
      style={{ width: "100%", position: "relative", padding: "1em" }}
      action={onSubmit}
      onSubmit={() => setIsLoading(true)}
    >
      <LoadingOverlay visible={isLoading} />
      <Input type="hidden" {...form.getInputProps("id")} />
      <Stack>
        <Group align={"start"} wrap={"nowrap"}>
          <Stack>
            <ThumbnailFileInput
              avatarProps={{
                size: "10em",
              }}
              fileInputProps={{
                placeholder: member.avatar_url?.split("/").pop()?.slice(-32),
                ...form.getInputProps("avatar_url"),
              }}
            />
          </Stack>
          <Stack w={"100%"}>
            <Fieldset legend="기본정보">
              <Input
                type={"text"}
                placeholder={"이름을 입력해주세요."}
                {...form.getInputProps("nickname")}
              />
            </Fieldset>
            <Fieldset legend="할당된 이메일 목록">
              <Stack gap={"0.5ex"}>
                {form
                  .getInputProps("emails")
                  .value.map((email: string, idx: number) => (
                    <Group key={email} wrap={"nowrap"}>
                      <FocusTrap active={true}>
                        <Input
                          w={"100%"}
                          type={"email"}
                          placeholder="이메일을 입력해주세요."
                          {...form.getInputProps(`emails.${idx}`)}
                          leftSection={<IconMail size={"1em"} />}
                          {...(focusedEmailIdx === idx
                            ? { "data-autofocus": true }
                            : {})}
                        />
                      </FocusTrap>
                      <CloseButton
                        icon={<IconXboxX size={"1em"} />}
                        onClick={() => form.removeListItem("emails", idx)}
                      />
                    </Group>
                  ))}
                <Group wrap={"nowrap"}>
                  <Input
                    w={"100%"}
                    type={"email"}
                    leftSection={<IconMail size={"1em"} />}
                    readOnly
                    onFocus={addEmailItem}
                  />
                  <ActionIcon
                    variant="subtle"
                    aria-label="Settings"
                    onClick={addEmailItem}
                  >
                    <IconRowInsertBottom
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Group>
              </Stack>
            </Fieldset>
          </Stack>
        </Group>
        <Group justify={"end"}>
          <Button variant={"outline"} size={"sm"}>
            수정
          </Button>
          <Button type={"submit"} size={"sm"}>
            저장
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
