// hooks/useIssues.js
import { Issue } from '@/types';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { getIssues } from '../../services/IssueService';

const useIssues = (axiosSecure: AxiosInstance) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  useEffect(() => {
    const fetchIssues = () => {
      if (!currentRepository) return;

      setLoading(true);
      getIssues(axiosSecure, {
        repoOwner: currentRepository.owner,
        repoName: currentRepository.name,
      })
        .then((data) => {
          setIssues(data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };

    fetchIssues();
  }, [currentRepository]); // Dependency array includes currentRepository to retrigger on change

  return { data: issues, loading, error };
};

export default useIssues;
