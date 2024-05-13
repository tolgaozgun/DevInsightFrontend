import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { getAveragePullRequestSize } from '../../services/PullRequestService';

export const useAveragePullRequestSize = (axiosSecure: AxiosInstance) => {
  const [averageSize, setAverageSize] = useState<number>(0.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  useEffect(() => {
    if (!currentRepository) return;
    setLoading(true);
    getAveragePullRequestSize(axiosSecure, {
      repoOwner: currentRepository.owner,
      repoName: currentRepository.name,
    })
      .then((response) => {
        setAverageSize(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [currentRepository]);

  return { data: averageSize, loading, error };
};
export default useAveragePullRequestSize;
