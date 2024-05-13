// Base type for common fields
interface BaseType {
  createdAt: string;
  updatedAt: string;
}

// Extending base type for all types
export type Repository = BaseType & {
  id: string; // UUID
  name: string;
  owner: string;
  url: string;
  issues: Issue[];
  pullRequests: PullRequest[];
  commits: Commit[];
  files: File[];
  contributors: Contributor[];
};

export type File = BaseType & {
  id: string; // UUID
  name: string;
  sha: string;
  path: string;
  repository: Repository;
  fileChanges: FileChange[];
};

export type Contributor = BaseType & {
  id: string; // UUID
  url: string;
  avatarUrl: string;
  name: string;
  email: string;
  repository: Repository;
  pullRequestReviewers: PullRequest[];
};

export type Issue = BaseType & {
  id: string; // UUID
  issueId: number;
  url: string;
  title: string;
  isClosed: boolean;
  closedAt?: Date; // Nullable
  closedBy?: Contributor; // Nullable
  severityRating: number;
  contributors: Contributor[];
  repository: Repository;
};

export type PullRequest = BaseType & {
  id: string; // UUID
  pullRequestId: number;
  url: string;
  title: string;
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

export type Commit = BaseType & {
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

export type FileChange = BaseType & {
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

export type RMostCommonlyChangedFile = BaseType & {
  fileName: string[];
  filePath: string[];
  changeCount: number;
};

export type RFileCommitRank = BaseType & {
  fileId: string; // UUID
  fileName: string;
  commitCount: number;
};

export type RMultipleCommits = BaseType & {
  repository: Repository;
  commits: Commit[];
};
