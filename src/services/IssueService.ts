import { Issue, QGetRepository, QScrapeRepository } from '@/types';
import { AxiosInstance } from 'axios';
import { baseUrl } from '../constants/api';
import { Response } from '../types/ResponseTypes';

export async function scrapeIssues(
  axiosSecure: AxiosInstance,
  qScrapeRepository: QScrapeRepository
) {
  const res = await axiosSecure
    .post<Response<Issue[]>>(`${baseUrl}/issue/scrape`, qScrapeRepository)
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}

export async function getIssues(axiosSecure: AxiosInstance, qGetRepository: QGetRepository) {
  const res = await axiosSecure
    .get<Response<Issue[]>>(
      `${baseUrl}/issue/${qGetRepository.repoOwner}/${qGetRepository.repoName}`
    )
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}
