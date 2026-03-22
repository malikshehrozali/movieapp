import { useEffect, useState } from "react";

const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autoFetch: boolean = true,
) => {
  const [loading, setLoading] = useState<boolean | null>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred"),
      );
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setLoading(false);
    setError(null);
    setData(null);
  };
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { loading, error, data, refetch: fetchData, reset };
};
