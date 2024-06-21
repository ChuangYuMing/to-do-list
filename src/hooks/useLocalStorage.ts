import { useState, useEffect, useRef } from "react";

type SetValue<T> = (value: T | ((val: T) => T)) => void;

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, SetValue<T>, Boolean] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const initialValueRef = useRef(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        setStoredValue(initialValueRef.current);
      } else {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  useEffect(() => {
    if (!isLoading) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    }
  }, [storedValue, isLoading, key]);

  const setValue: SetValue<T> = (value) => {
    setStoredValue(value);
  };

  return [storedValue, setValue, isLoading];
};

export default useLocalStorage;
