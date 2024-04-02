import { Octokit, RequestError } from "octokit";
import { InferInsertModel } from "drizzle-orm";
import { GitHubUser } from "@/database/schemas/github/raw";
import moment from "moment";

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
