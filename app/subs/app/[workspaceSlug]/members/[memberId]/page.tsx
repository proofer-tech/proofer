import { PageProps } from "@/src/types/general";
import { dz } from "@/database/engine";
import {
  Workspace,
  WorkspaceMember,
  WorkspaceMemberEmail,
} from "@/database/schemas/workspace";
import { eq } from "drizzle-orm";
import React from "react";
import { mapJoinData } from "@/src/utils/drizzle";
import MemberForm from "@/app/subs/app/[workspaceSlug]/members/[memberId]/MemberForm";
import { NotFound, Unauthorized } from "http-errors";
import { findUserFromSession } from "@/src/data/user";
import { put } from "@vercel/blob";

async function handleSubmit(formData: FormData) {
  "use server";
  const user = await findUserFromSession();
  if (!user) throw Unauthorized();

  await dz.transaction(async (tx) => {
    const workspaceMember = (
      await tx
        .select()
        .from(WorkspaceMember)
        .where(eq(WorkspaceMember.id, parseInt(formData.get("id") as string)))
    )[0];
    if (!workspaceMember) throw NotFound();

    const updateMap: any = {
      nickname: formData.get("nickname") as string,
    };
    const file = formData.get("avatar_url") as File;
    if (file) {
      const blob = await put(
        `uploads/workspaces/${workspaceMember.workspace_id}/members/${workspaceMember.id}/${file.name}`,
        file,
        {
          access: "public",
        },
      );
      updateMap["avatar_url"] = blob.url;
    }

    await tx
      .update(WorkspaceMember)
      .set(updateMap)
      .where(eq(WorkspaceMember.id, workspaceMember.id));

    await tx
      .delete(WorkspaceMemberEmail)
      .where(eq(WorkspaceMemberEmail.workspace_member_id, workspaceMember.id));
    await tx.insert(WorkspaceMemberEmail).values(
      formData.getAll("emails").map((email) => ({
        workspace_id: workspaceMember.workspace_id,
        workspace_member_id: workspaceMember.id,
        email: email.toString(),
      })),
    );
  });
}

export default async function MemberPage({ params }: PageProps) {
  const { workspaceSlug, memberId } = params;
  const member: any = mapJoinData(
    WorkspaceMember,
    { many: [WorkspaceMemberEmail] },
    await dz
      .select()
      .from(WorkspaceMember)
      .innerJoin(Workspace, eq(Workspace.slug, workspaceSlug))
      .leftJoin(
        WorkspaceMemberEmail,
        eq(WorkspaceMemberEmail.workspace_member_id, WorkspaceMember.id),
      )
      .where(eq(WorkspaceMember.id, parseInt(memberId))),
  )[0];

  return (
    <MemberForm
      handleSubmit={handleSubmit}
      member={member}
      emails={member.workspace_member_email_set}
    />
  );
}
