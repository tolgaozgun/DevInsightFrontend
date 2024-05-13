import { Commit } from '@/types';
import { AxiosInstance } from 'axios';
import { useCallback, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { scrapeCommits as scrapeCommitsService } from '../../services/CommitService';

const useScrapeCommits = (axiosSecure: AxiosInstance) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  const scrapeCommits = useCallback(async () => {
    if (!currentRepository) {
      return;
    }

    setLoading(true);
    try {
      const response = await scrapeCommitsService(axiosSecure, {
        repoOwner: currentRepository.owner,
        repoName: currentRepository.name,
      });
      setCommits(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, currentRepository]);

  return { data: commits, loading, error, scrapeCommits };
};

export default useScrapeCommits;
