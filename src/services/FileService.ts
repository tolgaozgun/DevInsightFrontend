import { Commit, QGetRepository, RFileCommitRank, RMostCommonlyChangedFile } from '@/types';
import { AxiosInstance } from 'axios';
import { baseUrl } from '../constants/api';
import { Response } from '../types/ResponseTypes';

export async function getFiles(axiosSecure: AxiosInstance, qGetRepository: QGetRepository) {
  const res = await axiosSecure
    .get<Response<Commit[]>>(
      `${baseUrl}/file/${qGetRepository.repoOwner}/${qGetRepository.repoName}`
    )
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}

export async function getMostCommonlyChangedFiles(
  axiosSecure: AxiosInstance,
  qGetRepository: QGetRepository
) {
  const res = await axiosSecure
    .get<Response<RMostCommonlyChangedFile[]>>(
      `${baseUrl}/file/most-commonly-changed-files/${qGetRepository.repoOwner}/${qGetRepository.repoName}`
    )
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}

export async function getFileCommitRanks(
  axiosSecure: AxiosInstance,
  qGetRepository: QGetRepository
) {
  const res = await axiosSecure
    .get<Response<RFileCommitRank[]>>(
      `${baseUrl}/file/file-rankings/${qGetRepository.repoOwner}/${qGetRepository.repoName}`
    )
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}
