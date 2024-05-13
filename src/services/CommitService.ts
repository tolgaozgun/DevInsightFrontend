import { Commit, QGetRepository, QScrapeRepository } from '@/types';
import { AxiosInstance } from 'axios';
import { baseUrl } from '../constants/api';
import { Response } from '../types/ResponseTypes';

export async function scrapeCommits(
  axiosSecure: AxiosInstance,
  qScrapeRepository: QScrapeRepository
) {
  const res = await axiosSecure
    .post<Response<Commit[]>>(`${baseUrl}/commit/scrape`, qScrapeRepository)
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}

export async function getCommits(axiosSecure: AxiosInstance, qGetRepository: QGetRepository) {
  const res = await axiosSecure
    .get<Response<Commit[]>>(
      `${baseUrl}/commit/${qGetRepository.repoOwner}/${qGetRepository.repoName}`
    )
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}

export async function getMultipleCommits(axiosSecure: AxiosInstance) {
  const res = await axiosSecure
    .get<Response<Commit[]>>(`${baseUrl}/commit/multiple`)
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}
