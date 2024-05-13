// hooks/useFiles.js
import { File } from '@/types';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { getFiles } from '../../services/FileService';

const useFiles = (axiosSecure: AxiosInstance) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  useEffect(() => {
    const fetchContributors = () => {
      if (!currentRepository) return;

      setLoading(true);
      getFiles(axiosSecure, {
        repoOwner: currentRepository.owner,
        repoName: currentRepository.name,
      })
        .then((data) => {
          setFiles(data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };

    fetchContributors();
  }, [currentRepository]); // Dependency array includes currentRepository to retrigger on change

  return { data: files, loading, error };
};

export default useFiles;
