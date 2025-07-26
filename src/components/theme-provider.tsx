'use client';

import { useAuth } from '@/components/auth-provider';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'fantasy' | 'romance' | 'scifi' | 'horror' | 'thriller' | 'historical';

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'vite-ui-theme',
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const { user, loading: authLoading } = useAuth();
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  const applyTheme = useCallback((themeToApply: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove(
      'light',
      'dark',
      'theme-fantasy',
      'theme-romance',
      'theme-scifi',
      'theme-horror',
      'theme-thriller',
      'theme-historical'
    );

    let finalThemeClass = '';
    if (themeToApply === 'dark' || themeToApply === 'light') {
        finalThemeClass = themeToApply;
    } else {
        finalThemeClass = `theme-${themeToApply}`;
    }
    
    root.classList.add(finalThemeClass);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (storedTheme) {
      setThemeState(storedTheme);
    }
  }, [storageKey]);

  useEffect(() => {
    async function fetchAndApplyUserTheme() {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const favoriteGenre = userDoc.data()?.favoriteGenre?.toLowerCase() as Theme;
            if (favoriteGenre) {
              setThemeState(favoriteGenre);
            }
          }
        } catch (e) {
          // When the user is not authenticated, reading from firestore will fail.
          // We can ignore this error.
        }
      }
    }
    if (!authLoading) {
      fetchAndApplyUserTheme();
    }
  }, [user, authLoading]);
  
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey, applyTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
