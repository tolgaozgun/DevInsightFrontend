import { PullRequest, QGetRepository, QScrapeRepository } from '@/types';
import { AxiosInstance } from 'axios';
import { baseUrl } from '../constants/api';
import { Response } from '../types/ResponseTypes';

export async function scrapePullRequests(
  axiosSecure: AxiosInstance,
  qScrapeRepository: QScrapeRepository
) {
  const res = await axiosSecure
    .post<Response<PullRequest[]>>(`${baseUrl}/pull-request/scrape`, qScrapeRepository)
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}

export async function getPullRequests(axiosSecure: AxiosInstance, qGetRepository: QGetRepository) {
  const res = await axiosSecure
    .get<Response<PullRequest[]>>(
      `${baseUrl}/pull-request/${qGetRepository.repoOwner}/${qGetRepository.repoName}`
    )
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}

export async function getAverageMergeTime(
  axiosSecure: AxiosInstance,
  qGetRepository: QGetRepository
) {
  const res = await axiosSecure
    .get<Response<number>>(
      `${baseUrl}/pull-request/average-merge-time/${qGetRepository.repoOwner}/${qGetRepository.repoName}`
    )
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}

export async function getAverageCommentsPerPullRequest(
  axiosSecure: AxiosInstance,
  qGetRepository: QGetRepository
) {
  const res = await axiosSecure
    .get<Response<number>>(
      `${baseUrl}/pull-request/average-comments-per-pull-request/${qGetRepository.repoOwner}/${qGetRepository.repoName}`
    )
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}

export async function getAveragePullRequestSize(
  axiosSecure: AxiosInstance,
  qGetRepository: QGetRepository
) {
  const res = await axiosSecure
    .get<Response<number>>(
      `${baseUrl}/pull-request/average-pull-request-size/${qGetRepository.repoOwner}/${qGetRepository.repoName}`
    )
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}

export async function getReviewCoverage(
  axiosSecure: AxiosInstance,
  qGetRepository: QGetRepository
) {
  const res = await axiosSecure
    .get<Response<number>>(
      `${baseUrl}/pull-request/review-coverage/${qGetRepository.repoOwner}/${qGetRepository.repoName}`
    )
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}
