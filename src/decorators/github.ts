import { catchFKUserReferenceError } from "@/src/github/users";
import { Octokit } from "octokit";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { GitHubApp } from "@/src/integrations/github";
import { dz } from "@/database/engine";

export const withUserSafe = async (
  func: Promise<any>,
  { octokit, tx }: { octokit?: Octokit; tx?: VercelPgDatabase } = {},
) => {
  const recursiveFunc: Awaited<typeof func> = async () => {
    return func.catch(async (e) =>
      catchFKUserReferenceError(tx || dz, octokit || GitHubApp.octokit, e).then(
        async () => recursiveFunc(),
      ),
    );
  };
  return recursiveFunc();
};
