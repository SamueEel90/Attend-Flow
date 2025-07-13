import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SelectedUserContextType {
  selectedUsername: string | null;
  setSelectedUsername: (username: string | null) => void;
  selectedUserId: string | null;
  setSelectedUserId: (id: string | null) => void;
}

const SelectedUserContext = createContext<SelectedUserContextType | undefined>(undefined);

export const SelectedUserProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

  return (
    <SelectedUserContext.Provider
      value={{
        selectedUserId,
        setSelectedUserId,
        selectedUsername,
        setSelectedUsername,
      }}
    >
      {children}
    </SelectedUserContext.Provider>
  );
};

export const useSelectedUser = () => {
  const context = useContext(SelectedUserContext);
  if (!context) {
    throw new Error('useSelectedUser must be used within a SelectedUserProvider');
  }
  return context;
};
export default SelectedUserContext;