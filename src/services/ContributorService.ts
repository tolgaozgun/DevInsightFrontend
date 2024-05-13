import { Contributor, QGetRepository, QScrapeRepository } from '@/types';
import { AxiosInstance } from 'axios';
import { baseUrl } from '../constants/api';
import { Response } from '../types/ResponseTypes';

export async function scrapeContributors(
  axiosSecure: AxiosInstance,
  qScrapeRepository: QScrapeRepository
) {
  const res = await axiosSecure
    .post<Response<Contributor[]>>(`${baseUrl}/contributor/scrape`, qScrapeRepository)
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}

export async function getContributors(axiosSecure: AxiosInstance, qGetRepository: QGetRepository) {
  const res = await axiosSecure
    .get<Response<Contributor[]>>(
      `${baseUrl}/contributor/${qGetRepository.repoOwner}/${qGetRepository.repoName}`
    )
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}
