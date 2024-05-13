import { PullRequest } from '@/types';
import { AxiosInstance } from 'axios';
import { useCallback, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { scrapePullRequests as scrapePullRequestsService } from '../../services/PullRequestService';

const useScrapePullRequests = (axiosSecure: AxiosInstance) => {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  const scrapePullRequests = useCallback(async () => {
    if (!currentRepository) {
      return;
    }

    setLoading(true);
    try {
      const response = await scrapePullRequestsService(axiosSecure, {
        repoOwner: currentRepository.owner,
        repoName: currentRepository.name,
      });
      setPullRequests(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, currentRepository]);

  return { data: pullRequests, loading, error, scrapePullRequests };
};

export default useScrapePullRequests;
