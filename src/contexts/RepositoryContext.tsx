import { Repository } from '@/types';
import React, { createContext, useContext, useState } from 'react';

type RepositoryContextType = {
  currentRepository: Repository | null;
  setCurrentRepository: (repository: Repository) => void;
};

interface RepositoryProviderProps {
  children?: React.ReactNode;
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

export const RepositoryProvider: React.FC = ({ children }: RepositoryProviderProps) => {
  const [currentRepository, setCurrentRepository] = useState<Repository | null>(null);
  console.log('currentRepository', currentRepository);

  return (
    <RepositoryContext.Provider value={{ currentRepository, setCurrentRepository }}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepository = () => {
  const context = useContext(RepositoryContext);
  if (context === undefined) {
    throw new Error('useRepository must be used within a RepositoryProvider');
  }
  return context;
};
