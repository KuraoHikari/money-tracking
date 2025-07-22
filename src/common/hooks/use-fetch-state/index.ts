import { useCallback, useMemo, useState } from "react";

export const useFetchState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>();

  const errorMessage = useMemo(() => {
    return error
      ? error instanceof Error
        ? error?.message
        : "Terjadi kesalahan"
      : undefined;
  }, [error]);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const endLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    errorMessage,
    setError,
    startLoading,
    endLoading,
  };
};
