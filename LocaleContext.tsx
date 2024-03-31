'use client';

// Criar um arquivo chamado LocaleContext.tsx
import React, { createContext, ReactNode, useContext } from 'react';

type LocaleContextType = {
  locale: string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ locale: string; children: ReactNode }> = ({ locale, children }) => (
  <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>
);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};