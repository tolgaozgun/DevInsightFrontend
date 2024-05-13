// RepositoryDropdown.tsx
import { Repository } from '@/types';
import { Select } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useRepository } from '../../contexts/RepositoryContext';
import useAxiosSecure from '../../hooks/auth/useAxiosSecure';
import useRepositories from '../../hooks/github/useRepositories';
import NewRepositoryModal from '../NewRepositoryModal';

const RepositoryDropdown: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const { data: repositories, loading, error } = useRepositories(axiosSecure);
  const { currentRepository, setCurrentRepository } = useRepository();
  const [modalOpened, setModalOpened] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading repositories</p>;

  // Check if currentRepository changed

  const handleChange = (value: string | null) => {
    if (value) {
      if (value === 'new-repository') {
        setModalOpened(true);
        return;
      }

      const selectedRepo = repositories.find((repo: Repository) => repo.id === value);
      if (selectedRepo) {
        setCurrentRepository(selectedRepo);
      }
    }
  };

  return (
    <>
      <Select
        label="Select a repository"
        placeholder="Choose repository"
        data={[
          { value: 'new-repository', label: 'Create new repository' },
          ...repositories.map((repo: Repository) => ({
            value: repo.id,
            label: repo.owner + '/' + repo.name,
          })),
        ]}
        defaultValue={
          currentRepository ? currentRepository.owner + '/' + currentRepository.name : null
        }
        leftSection={<IconBrandGithub />}
        onChange={handleChange}
        searchable
      />
      <NewRepositoryModal
        opened={modalOpened}
        setOpened={setModalOpened}
        axiosSecure={axiosSecure}
      />
    </>
  );
};

export default RepositoryDropdown;
