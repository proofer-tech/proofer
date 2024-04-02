export enum GitHubEvent {
  commit = "commit",
  push = "push",
  "pull_request.opened" = "pull_request.opened",
  "pull_request.closed" = "pull_request.closed",
  "pull_request.merged" = "pull_request.merged",
  "pull_request_review.submitted" = "pull_request_review.submitted",
  "pull_request_review_comment.created" = "pull_request_review_comment.created",
  "issues.opened" = "issues.opened",
  "issue_comment.created" = "issue_comment.created",
  release = "release",
}
