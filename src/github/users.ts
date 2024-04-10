import { Octokit, RequestError } from "octokit";
import { eq, InferInsertModel } from "drizzle-orm";
import { GitHubUser } from "@/database/schemas/github/raw";
import moment from "moment";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { NotFound } from "http-errors";
import { cached } from "@/src/redis";
import { dz } from "@/database/engine";
import { conflictUpdateSetAllColumns } from "@/src/utils/drizzle";

function serializeUser(data: any): InferInsertModel<typeof GitHubUser> {
  return {
    user_id: data.id,
    login: data.login,
    email: data.email,
    avatar_url: data.avatar_url,
    html_url: data.html_url,
    type: data.type,
    created_at: moment(data.created_at).toDate(),
    updated_at: moment(data.updated_at).toDate(),
  };
}
export async function getUser(octokit: Octokit, user_id: number) {
  try {
    const response = await octokit.request(`GET /user/${user_id}`);
    return serializeUser(response.data);
  } catch (e) {
    if (!(e instanceof RequestError && e.status === 404)) throw e;
  }
  return null;
}

export const ensureGitHubUser = cached(async function ensureUser(
  octokit: Octokit,
  user_id: number,
) {
  const dbUser = (
    await dz.select().from(GitHubUser).where(eq(GitHubUser.user_id, user_id))
  )[0];
  if (dbUser) return dbUser;

  const githubUser = await getUser(octokit, user_id);
  if (githubUser === null) throw NotFound(`User with id ${user_id} not found`);

  return (
    await dz
      .insert(GitHubUser)
      .values(githubUser)
      .onConflictDoUpdate({
        target: GitHubUser.user_id,
        set: conflictUpdateSetAllColumns(GitHubUser),
      })
      .returning()
  )[0];
});

export async function catchFKUserReferenceError(
  tx: VercelPgDatabase,
  octokit: Octokit,
  e: any,
) {
  if (e.code !== "23503") throw e;
  const userIdExp = new RegExp(/=\((\d+)\)/);
  const userId = userIdExp.exec(e.detail)?.[1];
  if (!userId) throw e;
  return ensureGitHubUser(octokit, parseInt(userId));
}
