import { QAddRepository, Repository } from '@/types';
import { AxiosInstance } from 'axios';
import { baseUrl } from '../constants/api';
import { Response } from '../types/ResponseTypes';

export async function addRepository(axiosSecure: AxiosInstance, qAddRepository: QAddRepository) {
  const res = await axiosSecure
    .post<Response<Repository>>(`${baseUrl}/repository`, qAddRepository)
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}

export async function getRepository(axiosSecure: AxiosInstance) {
  const res = await axiosSecure
    .get<Response<Repository[]>>(`${baseUrl}/repository`)
    .catch((err) => (err.response ? err.response : err));
  return res.data;
}
