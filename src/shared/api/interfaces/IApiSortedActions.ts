import { SortTuple } from './SortTuple';

export interface IApiSortedActions {
  sort(fields?: Array<SortTuple> | Map<string, 'asc' | 'desc'>): void;
}
