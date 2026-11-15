import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const cachedValue = localStorage.getItem(key);
      return cachedValue !== null
        ? (JSON.parse(cachedValue) as T)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore storage errors (e.g. private mode) so the app keeps working
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};
