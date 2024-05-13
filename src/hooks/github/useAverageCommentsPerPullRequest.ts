import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { getAverageCommentsPerPullRequest } from '../../services/PullRequestService';
import { useRepository } from '../../contexts/RepositoryContext';

export const useAverageCommentsPerPullRequest = (axiosSecure: AxiosInstance) => {
  const [averageComments, setAverageComments] = useState<number>(0.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  useEffect(() => {
    if (!currentRepository) return;
    setLoading(true);
    getAverageCommentsPerPullRequest(axiosSecure, {
      repoOwner: currentRepository.owner,
      repoName: currentRepository.name,
    })
      .then((response) => {
        setAverageComments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [currentRepository]);

  return { data: averageComments, loading, error };
};

export default useAverageCommentsPerPullRequest;
