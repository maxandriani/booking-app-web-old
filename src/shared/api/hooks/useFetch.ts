import { useEffect, useState } from "react";
import { IAsyncStateStandards } from '../../core/interfaces/IAsyncStateStandards';

export interface IFetchState<T> extends IAsyncStateStandards<T> { }

export default function useFetch<T>(init: () => Promise<T>): IFetchState<T> {
  const [result, setResult] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    init()
      .then(result => setResult(result))
      .catch(err => setError(err))
      .finally(() => setIsReady(true));
  }, [init]);

  return {
    result,
    error,
    isReady
  }
}
