import { db } from "@/database/engine";
import { GitHubPullRequest, GitHubRepository } from "@/database/schemas/github";
import { desc, eq } from "drizzle-orm";

export async function getAllRepositories(installation_id: number) {
  return db
    .select()
    .from(GitHubRepository)
    .where(eq(GitHubRepository.installation_id, installation_id));
}
export async function findRepository(repository_id: number) {
  return (
    await db
      .select()
      .from(GitHubRepository)
      .where(eq(GitHubRepository.repository_id, repository_id))
  )[0];
}

export async function findPullRequest(pull_request_id: number) {
  return (
    await db
      .select()
      .from(GitHubPullRequest)
      .where(eq(GitHubPullRequest.pull_request_id, pull_request_id))
  )[0];
}

export async function getLastPullRequest(repository_id: number) {
  return (
    await db
      .select()
      .from(GitHubPullRequest)
      .where(eq(GitHubPullRequest.repository_id, repository_id))
      .orderBy(desc(GitHubPullRequest.created_at))
  )[0];
}
