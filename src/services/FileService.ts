import { Commit, QGetRepository } from '@/types';
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
