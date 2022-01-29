import { useCallback } from 'react';
import { serializeSortMap } from '../helpers/serializeSortMap';
import { IApiCollectionRequest } from '../interfaces/IApiCollectionRequest';
import { IApiCollectionState } from '../interfaces/IApiCollectionState';
import { IApiSortedActions } from '../interfaces/IApiSortedActions';
import { IApiSortedQuery } from '../interfaces/IApiSortedQuery';
import { SortTuple } from '../interfaces/SortTuple';
import { useApiCollection } from './useApiCollection';

export function useApiSortedCollection<TType, TQuery extends IApiSortedQuery>(
  request: IApiCollectionRequest<TType, TQuery>,
  initQuery?: TQuery
): IApiCollectionState<TType, TQuery> & IApiSortedActions {

  const { query, load, ...requestState } = useApiCollection(request, initQuery);

  const sort = useCallback((sorting?: Array<SortTuple> | Map<string, 'asc' | 'desc'>) => {
    const hasSorting = !!sorting && (Array.isArray(sorting) ? sorting.length > 0 : sorting.size > 0);
    if (hasSorting) {
      load({ ...query, sorting: serializeSortMap(sorting) } as TQuery);
    } else {
      const newQuery = { ...query };
      delete newQuery.sorting;
      load(newQuery as TQuery);
    }
  }, [query, load]);

  return { ...requestState, query, load, sort }
}