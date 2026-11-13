import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    console.log('Initializing localStorage for key:', key);
    const cachedValue = localStorage.getItem(key);
    return cachedValue !== null ? JSON.parse(cachedValue) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);
  return [storedValue, setStoredValue] as const;
};
