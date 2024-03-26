import { App } from "octokit";

export const GitHubApp = new App({
  appId: process.env.GITHUB_APP_ID || "",
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY || "",
  oauth: {
    clientId: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
  },
});
