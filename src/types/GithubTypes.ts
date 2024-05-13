// Types for Enums (assuming possible values based on common patterns)
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

// Helper types for relationships
export type Repository = {
  id: string; // UUID
  name: string;
  owner: string;
  url: string;
  issues: Issue[];
  pullRequests: PullRequest[];
  commits: Commit[];
  files: File[];
  contributors: Contributor[];
  createdAt: Date;
};

export type File = {
  id: string; // UUID
  name: string;
  sha: string;
  path: string;
  repository: Repository;
  fileChanges: FileChange[];
};

export type Contributor = {
  id: string; // UUID
  url: string;
  avatarUrl: string;
  name: string;
  email: string;
  repository: Repository;
  pullRequestReviewers: PullRequest[];
};

export type Issue = {
  id: string; // UUID
  issueId: number;
  url: string;
  title: string;
  isClosed: boolean;
  createdAt: Date; // Using JavaScript Date object
  closedAt?: Date; // Nullable, indicated by `@Nullable`
  closedBy?: Contributor; // Nullable
  severityRating: number;
  contributors: Contributor[];
  repository: Repository;
};

export type PullRequest = {
  id: string; // UUID
  pullRequestId: number;
  url: string;
  title: string;
  createdAt: Date;
  mergedAt?: Date; // Nullable
  numberOfComments: number;
  reviewed: boolean;
  size: number;
  additions: number;
  deletions: number;
  repository: Repository;
  requestedReviewers: Contributor[];
  assignees: Contributor[];
};

export type Commit = {
  id: string; // UUID
  url: string;
  timestamp: Date;
  hash: string;
  commitTime: Date;
  contributor: Contributor;
  repository: Repository;
  pullRequests: PullRequest[];
  changedFiles: File[];
};

export type FileChange = {
  id: string; // UUID
  additions: number;
  changes: number;
  deletions: number;
  patch: string;
  status: string;
  contentsUrl: string;
  blobUrl: string;
  rawUrl: string;
  sha: string;
  file: File;
};

export type QAddRepository = {
  repoName: string;
  repoOwner: string;
};

export type QScrapeRepository = {
  repoName: string;
  repoOwner: string;
};

export type QGetRepository = {
  repoName: string;
  repoOwner: string;
};
