// hooks/useIssues.js
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { getMultipleCommits } from '../../services/CommitService';
import { RMultipleCommits } from '@/types';

// hooks/useCommits.js
const useMultipleCommits = (axiosSecure: AxiosInstance) => {
  const [commits, setCommits] = useState<RMultipleCommits[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  useEffect(() => {
    const fetchCommits = () => {
      if (!currentRepository) return;

      setLoading(true);
      getMultipleCommits(axiosSecure)
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

export default useMultipleCommits;
