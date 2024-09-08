import { useEffect, useState } from 'react';

function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = window.localStorage.getItem(key);
    if (jsonValue != null) {
      try {
        return JSON.parse(jsonValue) as T;
      } catch {
        // If parsing fails, return the default value
        return defaultValue;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
