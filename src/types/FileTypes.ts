export type FileCommitData = {
  fileName: string;
  commitCount: number;
  contributors: string[];
  mostRecentCommit: string; // Could be ISO 8601 date string for simplicity
};
export type CodeReviewEfficiencyData = {
  repoName: string;
  averageTimeToMerge: number;
  averagePRSize: number;
  reviewCoverage: number;
  numberOfCommentsPerPR: number;
};

export type DeveloperCommitVolume = {
  developerName: string;
  totalCommits: number;
  mostFrequentFiles: string[]; // List of files the developer has most frequently modified
};

export type CommonFileChangesData = {
  fileGroup: string[]; // Array of file names that are commonly changed together
  coCommitCount: number; // Number of times these files have been committed together
};

export type EffectiveDeveloperData = {
  developerName: string;
  commitCount: number;
  closedIssueCount: number;
  codeStickiness: number; // Could be a percentage or a ratio
  fixedBugsCount: number;
};

export type CodeStickinessData = {
  developerName: string;
  stickinessPercentage: number; // Represents the percentage of a developer's contributions that have remained unaltered over a specified period.
};
