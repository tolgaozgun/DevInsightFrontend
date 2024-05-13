import { Issue } from '@/types';
import { AxiosInstance } from 'axios';
import { useCallback, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { scrapeIssues as scrapeIssuesService } from '../../services/IssueService';

const useScrapeIssues = (axiosSecure: AxiosInstance) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  // Define the function that will handle the actual scraping
  const scrapeIssues = useCallback(async () => {
    if (!currentRepository) {
      return;
    }

    setLoading(true);
    try {
      const response = await scrapeIssuesService(axiosSecure, {
        repoOwner: currentRepository.owner,
        repoName: currentRepository.name,
      });
      setIssues(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, currentRepository]);

  return { data: issues, loading, error, scrapeIssues };
};

export default useScrapeIssues;
