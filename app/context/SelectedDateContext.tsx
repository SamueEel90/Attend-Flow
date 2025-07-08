// src/context/SelectedDateContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SelectedDateContextType {
  date: Date;
  setDate: (date: Date) => void;
}

const SelectedDateContext = createContext<SelectedDateContextType | undefined>(undefined);

export const SelectedDateProvider = ({ children }: { children: ReactNode }) => {
  const [date, setDate] = useState(new Date());

  return (
    <SelectedDateContext.Provider value={{ date, setDate }}>
      {children}
    </SelectedDateContext.Provider>
  );
};

export const useSelectedDate = () => {
  const context = useContext(SelectedDateContext);
  if (!context) {
    throw new Error('useSelectedDate must be used within a SelectedDateProvider');
  }
  return context;
};
export default SelectedDateContext;