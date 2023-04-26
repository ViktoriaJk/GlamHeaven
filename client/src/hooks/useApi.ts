import { useState, useEffect } from 'react';

type Response<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};

const useApi = <T>(
  func: () => Promise<{ data: T; status: number }>,
  initialState: T | null = null
): Response<T> => {
  const [data, setData] = useState<T | null>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const callApiFunc = async () => {
    setLoading(true);
    try {
      const response: { data: T; status: number } = await func();
      if (response.status !== 200) throw new Error(`${response.data}`);
      setData(response.data);
    } catch (error) {
      setError(`${error}`);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callApiFunc();
  }, []);

  const reload = () => callApiFunc();

  return { data, loading, error, reload };
};

export default useApi;
