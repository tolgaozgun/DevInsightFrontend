// hooks/useIssues.js
import { PullRequest } from '@/types';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { getPullRequests } from '../../services/PullRequestService';

// hooks/usePullRequests.js
const usePullRequests = (axiosSecure: AxiosInstance) => {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  useEffect(() => {
    const fetchPullRequests = () => {
      if (!currentRepository) return;

      setLoading(true);
      getPullRequests(axiosSecure, {
        repoOwner: currentRepository.owner,
        repoName: currentRepository.name,
      })
        .then((data) => {
          setPullRequests(data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };

    fetchPullRequests();
  }, [currentRepository]); // Dependency array includes currentRepository to retrigger on change

  return { data: pullRequests, loading, error };
};

export default usePullRequests;
