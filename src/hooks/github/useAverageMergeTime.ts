import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { getAverageMergeTime } from '../../services/PullRequestService';

export const useAverageMergeTime = (axiosSecure: AxiosInstance) => {
  const [averageMergeTime, setAverageMergeTime] = useState<number>(0.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  useEffect(() => {
    if (!currentRepository) return;
    setLoading(true);
    getAverageMergeTime(axiosSecure, {
      repoOwner: currentRepository.owner,
      repoName: currentRepository.name,
    })
      .then((response) => {
        setAverageMergeTime(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [currentRepository]);

  return { data: averageMergeTime, loading, error };
};

export default useAverageMergeTime;
