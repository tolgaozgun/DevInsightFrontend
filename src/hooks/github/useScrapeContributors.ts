import { Contributor } from '@/types';
import { AxiosInstance } from 'axios';
import { useCallback, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { scrapeContributors as scrapeContributorsService } from '../../services/ContributorService';

const useScrapeContributors = (axiosSecure: AxiosInstance) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  const scrapeContributors = useCallback(async () => {
    if (!currentRepository) {
      return;
    }

    setLoading(true);
    try {
      const response = await scrapeContributorsService(axiosSecure, {
        repoOwner: currentRepository.owner,
        repoName: currentRepository.name,
      });
      setContributors(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, currentRepository]);

  return { data: contributors, loading, error, scrapeContributors };
};

export default useScrapeContributors;
