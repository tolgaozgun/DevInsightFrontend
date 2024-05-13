import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import { getReviewCoverage } from '../../services/PullRequestService';

export const useReviewCoverage = (axiosSecure: AxiosInstance) => {
  const [reviewCoverage, setReviewCoverage] = useState<number>(0.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentRepository } = useRepository();

  useEffect(() => {
    if (!currentRepository) return;
    setLoading(true);
    getReviewCoverage(axiosSecure, {
      repoOwner: currentRepository.owner,
      repoName: currentRepository.name,
    })
      .then((response) => {
        setReviewCoverage(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [currentRepository]);

  return { data: reviewCoverage, loading, error };
};

export default useReviewCoverage;
