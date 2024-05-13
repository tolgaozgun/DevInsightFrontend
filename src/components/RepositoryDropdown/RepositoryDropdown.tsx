// RepositoryDropdown.tsx
import { Repository } from '@/types';
import { Select } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import { AxiosInstance } from 'axios';
import React from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import useAxiosSecure from '../../hooks/auth/useAxiosSecure';
import useRepositories from '../../hooks/github/useRepositories';

type RepositoryDropdownProps = {
  axiosSecure: AxiosInstance;
};

const RepositoryDropdown: React.FC<RepositoryDropdownProps> = () => {
  const axiosSecure = useAxiosSecure();
  const { data: repositories, loading, error } = useRepositories(axiosSecure);
  const { currentRepository, setCurrentRepository } = useRepository();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading repositories</p>;

  const handleChange = (value: string | null) => {
    if (value) {
      const selectedRepo = repositories.find((repo: Repository) => repo.id === value);
      if (selectedRepo) {
        setCurrentRepository(selectedRepo);
      }
    }
  };

  return (
    <Select
      label="Select a repository"
      placeholder="Choose repository"
      data={repositories.map((repo: Repository) => ({
        value: repo.id,
        label: repo.owner + '/' + repo.name,
      }))}
      defaultValue={
        currentRepository ? currentRepository.owner + '/' + currentRepository.name : null
      }
      leftSection={<IconBrandGithub />}
      onChange={handleChange}
      searchable
    />
  );
};

export default RepositoryDropdown;
