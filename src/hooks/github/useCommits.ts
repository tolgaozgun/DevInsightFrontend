// hooks/useIssues.js
import { Commit } from '@/types';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { getCommits } from '../../services/CommitService';

// hooks/useCommits.js
const useCommits = (axiosSecure: AxiosInstance) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  useEffect(() => {
    const fetchCommits = () => {
      if (!currentRepository) return;

      setLoading(true);
      getCommits(axiosSecure, {
        repoOwner: currentRepository.owner,
        repoName: currentRepository.name,
      })
        .then((data) => {
          setCommits(data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };

    fetchCommits();
  }, [currentRepository]); // Dependency array includes currentRepository to retrigger on change

  return { data: commits, loading, error };
};

export default useCommits;
