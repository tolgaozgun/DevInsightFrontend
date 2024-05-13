import { QAddRepository } from '@/types';
import { Button, Group, Modal, TextInput } from '@mantine/core';
import { AxiosInstance } from 'axios';
import React, { useState } from 'react';
import useAddRepository from '../hooks/github/useAddRepository';
import { addRepository as addRepositoryService } from '../services/RepositoryService';

type NewRepositoryModalProps = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  axiosSecure: AxiosInstance;
};

const NewRepositoryModal: React.FC<NewRepositoryModalProps> = ({
  opened,
  setOpened,
  axiosSecure,
}) => {
  const [owner, setOwner] = useState('');
  const [repoName, setRepoName] = useState('');
  const {
    loading: repositoriesLoading,
    error: repositoriesError,
    addRepository,
  } = useAddRepository(axiosSecure);

  const handleSubmit = async () => {
    if (owner && repoName) {
      const qAddRepository: QAddRepository = {
        repoOwner: owner,
        repoName: repoName,
      };
      await addRepositoryService(axiosSecure, qAddRepository);
      setOpened(false);
      // Refresh page
      window.location.reload();
    }
  };

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Create New Repository">
      <TextInput
        label="Repository owner"
        placeholder="GitHub username"
        value={owner}
        onChange={(event) => setOwner(event.currentTarget.value)}
        required
      />
      <TextInput
        label="Repository name"
        placeholder="Repository name"
        value={repoName}
        onChange={(event) => setRepoName(event.currentTarget.value)}
        required
      />
      <Group align="flex-end" mt="md">
        <Button onClick={handleSubmit}>Create Repository</Button>
      </Group>
    </Modal>
  );
};

export default NewRepositoryModal;
