import { Repository } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';

type RepositoryContextType = {
  currentRepository: Repository | null;
  setCurrentRepository: (repository: Repository) => void;
  onRepositoryChange?: (repository: Repository | null) => void; // Optional callback
};

interface RepositoryProviderProps {
  children?: React.ReactNode;
  onRepositoryChange?: (repository: Repository | null) => void; // Prop for the callback
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

export const RepositoryProvider: React.FC<RepositoryProviderProps> = ({
  children,
  onRepositoryChange,
}) => {
  const [currentRepository, setCurrentRepository] = useState<Repository | null>(null);

  // Write into local storage and trigger callback
  useEffect(() => {
    if (currentRepository) {
      localStorage.setItem('currentRepository', JSON.stringify(currentRepository));
      onRepositoryChange?.(currentRepository); // Call the callback when repository changes
    }
  }, [currentRepository, onRepositoryChange]); // Include onRepositoryChange in dependency array

  // Read from local storage
  useEffect(() => {
    const storedRepository = localStorage.getItem('currentRepository');
    if (storedRepository) {
      setCurrentRepository(JSON.parse(storedRepository));
    }
  }, []);

  return (
    <RepositoryContext.Provider
      value={{ currentRepository, setCurrentRepository, onRepositoryChange }}
    >
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
