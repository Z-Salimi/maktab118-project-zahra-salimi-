
import React, { createContext, useContext, ReactNode } from 'react';

interface UserContextProps {
  userId: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ userId: string, children: ReactNode }> = ({ userId, children }) => {
  return <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
