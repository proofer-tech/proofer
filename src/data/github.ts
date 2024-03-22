import { db } from "@/database/engine";
import { GitHubRepository } from "@/database/schemas/github";
import { eq } from "drizzle-orm";

export async function getAllRepositories(installation_id: number) {
  return db
    .select()
    .from(GitHubRepository)
    .where(eq(GitHubRepository.installation_id, installation_id));
}
