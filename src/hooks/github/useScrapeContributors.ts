// hooks/useIssues.js
import { Contributor } from '@/types';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { scrapeContributors } from '../../services/ContributorService';

const useScrapeContributors = (axiosSecure: AxiosInstance) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  useEffect(() => {
    const fetchContributors = () => {
      if (!currentRepository) return;

      setLoading(true);
      scrapeContributors(axiosSecure, {
        repoOwner: currentRepository.owner,
        repoName: currentRepository.name,
      })
        .then((data) => {
          setContributors(data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };

    fetchContributors();
  }, [currentRepository]); // Dependency array includes currentRepository to retrigger on change

  return { data: contributors, loading, error };
};

export default useScrapeContributors;
