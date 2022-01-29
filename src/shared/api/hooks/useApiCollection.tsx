import { useCallback, useEffect, useRef, useState } from 'react';
import { IApiCollection } from '../interfaces/IApiCollection';
import { IApiCollectionRequest } from '../interfaces/IApiCollectionRequest';
import { IApiCollectionState } from '../interfaces/IApiCollectionState';
import { IApiRequestWithQueryState } from '../interfaces/IApiRequestWithQueryState';

export function useApiCollection<TType, TQuery>(
  request: IApiCollectionRequest<TType, TQuery>,
  initQuery?: TQuery
): IApiCollectionState<TType, TQuery> {
  const [{ query, result, isReady, error }, setState] = useState<IApiRequestWithQueryState<IApiCollection<TType>, TQuery>>({ isReady: false, query: initQuery });
  const abortController = useRef<AbortController>();

  function abortRequest(abort?: AbortController) {
    abortController.current?.abort();
    abortController.current = abort ?? new AbortController();
  }

  const load = useCallback((query?: TQuery, abort?: AbortController) => {
    abortRequest(abort);
    setState({ isReady: false, query });
  }, []);

  const refresh = useCallback((abort?: AbortController) => {
    abortRequest(abort);
    setState({ isReady: false, query: Object.assign({}, query) });
  }, [query]);

  useEffect(() => {
    async function doRequest() {
      try {
        if (!abortController.current) abortController.current = new AbortController();
        const result = await request(query, abortController.current);
        setState({ isReady: true, result, query });
      } catch (error) {
        setState({ isReady: true, error: error as Error, query });
      }
    }

    doRequest();
  }, [query, request]);

  return { query, isReady, result, error, load, refresh };
}
