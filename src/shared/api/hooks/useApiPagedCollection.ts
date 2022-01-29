import { useCallback } from 'react';
import { IApiCollectionRequest } from '../interfaces/IApiCollectionRequest';
import { IApiCollectionState } from '../interfaces/IApiCollectionState';
import { IApiPagedActions } from '../interfaces/IApiPagedActions';
import { IApiPagedQuery } from '../interfaces/IApiPagedQuery';
import { useApiCollection } from './useApiCollection';

export type IApiPagedQueryState = IApiPagedQuery & { totalCount: number, maxResultCount: number, skipCount: number, page: number };

export function useApiPagedCollection<TType, TQuery extends IApiPagedQuery>(
  request: IApiCollectionRequest<TType, TQuery>,
  initQuery?: TQuery
): IApiCollectionState<TType, TQuery> & IApiPagedActions & IApiPagedQueryState {

  const { query, load, ...requestState } = useApiCollection(request, initQuery);
  const { skipCount = 0, maxResultCount = 100 } = query ?? {};
  const page = Math.ceil(skipCount / maxResultCount);
  const totalCount = requestState.result?.totalCount ?? 0;

  const goTo = useCallback((nextPage) => {
    if (page === nextPage)
      return;
    if (maxResultCount === 0)
      throw RangeError('Para desativar a paginação, use `useApiCollection()` ao invés de `useApiPagedCollection`.');
    if (nextPage < 0)
      throw RangeError('Não é possível navegar para uma página negativa');
    if (requestState.result && nextPage > (totalCount / maxResultCount))
      throw RangeError('Não é possível navegar além do limite da imaginação.');

    load({ ...query, skipCount, maxResultCount } as TQuery);
  }, [maxResultCount, page, query, requestState.result, skipCount, totalCount, load]);

  const next = useCallback(() => goTo(page + 1), [goTo, page]);
  const prev = useCallback(() => goTo(page - 1), [goTo, page]);

  return { ...requestState, query, totalCount, maxResultCount, skipCount, page, load, next, prev, goTo }
}