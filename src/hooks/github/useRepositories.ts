import { Repository } from '@/types';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { getRepository } from '../../services/RepositoryService';

const useRepositories = (axiosSecure: AxiosInstance) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getRepository(axiosSecure)
      .then((data) => {
        setRepositories(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data: repositories, loading, error };
};

export default useRepositories;
