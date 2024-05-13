import { PanelItem } from '@/types';

import {
  IconActivity,
  IconAdjustments,
  IconAward,
  IconBrandGithub,
  IconFileCode,
  IconGauge,
  IconMessageCircle,
  IconRobot,
  IconUserCheck,
} from '@tabler/icons-react';

export const AdminPanelData: PanelItem[] = [
  { label: 'Dashboard', icon: IconGauge, link: '/panel/dashboard' },
  {
    label: 'Github Data',
    icon: IconBrandGithub,
    link: '/panel/github-data',
    links: [
      { label: 'Repositories', link: '/panel/github-data/repositories' },
      { label: 'Issues', link: '/panel/github-data/issues' },
      { label: 'Pull Requests', link: '/panel/github-data/pull-requests' },
      { label: 'Commits', link: '/panel/github-data/commits' },
      { label: 'Files', link: '/panel/github-data/files' },
      { label: 'Contributors', link: '/panel/github-data/contributors' },
    ],
  },
  {
    label: 'Commit Analysis',
    icon: IconFileCode,
    link: '/panel/commit-analysis',
    links: [
      { label: 'File Commit Ranking', link: '/panel/commit-analysis/file-ranking' },
      { label: 'Developer Commit Volume', link: '/panel/commit-analysis/dev-volume' },
      { label: 'Common File Changes', link: '/panel/commit-analysis/common-changes' },
    ],
  },
  {
    label: 'Developer Performance',
    icon: IconAward,
    link: '/panel/developer-performance',
    links: [
      { label: 'Most Effective Developer', link: '/panel/developer-performance/effective' },
      { label: 'Code Stickiness', link: '/panel/developer-performance/stickiness' },
      { label: 'Bug Fixing Efficiency', link: '/panel/developer-performance/bug-fixing' },
    ],
  },
  {
    label: 'Project Health',
    icon: IconActivity,
    link: '/panel/project-health',
    links: [
      { label: 'Issue Severity Rating', link: '/panel/project-health/issue-severity' },
      { label: 'Issue Resolution Metrics', link: '/panel/project-health/resolution-metrics' },
    ],
  },
  {
    label: 'Code Review',
    icon: IconMessageCircle,
    link: '/panel/code-review',
    links: [
      { label: 'Review Efficiency', link: '/panel/code-review/efficiency' },
      { label: 'PR Discussion', link: '/panel/code-review/discussion' },
      { label: 'PR Size and Coverage', link: '/panel/code-review/size-coverage' },
    ],
  },
  {
    label: 'Collaboration',
    icon: IconUserCheck,
    link: '/panel/collaboration',
    links: [
      { label: 'Collaborative PRs', link: '/panel/collaboration/collaborative-prs' },
      { label: 'Commit Patterns', link: '/panel/collaboration/commit-patterns' },
      { label: 'Active Discussions', link: '/panel/collaboration/active-discussions' },
    ],
  },
  {
    label: 'AI Enhancements',
    icon: IconRobot, // Assuming a robot icon for AI features
    link: '/panel/ai-enhancements',
    links: [
      { label: 'Issue Improvements', link: '/panel/ai-enhancements/issue-improvements' },
      { label: 'PR and Code Improvements', link: '/panel/ai-enhancements/pr-code-improvements' },
      { label: 'Automatic Code Review', link: '/panel/ai-enhancements/auto-code-review' },
      { label: 'Javadoc Generation', link: '/panel/ai-enhancements/javadoc-generation' }, // Assuming Javadoc generation is part of PR and Code Improvements
    ],
  },
  {
    label: 'Settings',
    icon: IconAdjustments,
    link: '/settings',
    links: [
      { label: 'Account Settings', link: '/panel/settings/account' },
      { label: 'Preferences', link: '/panel/settings/preferences' },
    ],
  },
];
