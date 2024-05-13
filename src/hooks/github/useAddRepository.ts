import { QAddRepository } from '@/types';
import { AxiosInstance } from 'axios';
import { useCallback, useState } from 'react';

const useAddRepository = (axiosSecure: AxiosInstance) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const addRepository = useCallback(
    async (qAddRepository: QAddRepository) => {
      setLoading(true);
      try {
        await addRepository(qAddRepository);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [axiosSecure]
  );

  return { loading, error, addRepository };
};

export default useAddRepository;
