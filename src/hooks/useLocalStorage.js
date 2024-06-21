import { useState, useEffect, useRef } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const initialValueRef = useRef(initialValue);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValueRef.current);
      } catch (error) {
        console.error(error);
      }
    }
  }, [isMounted, key]);

  useEffect(() => {
    if (isMounted) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    }
  }, [storedValue, isMounted, key]);

  const setValue = (value) => {
    setStoredValue(value);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
