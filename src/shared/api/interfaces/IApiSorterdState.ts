import { SortTuple } from './SortTuple';

export interface IApiSortedState {
  sorting?: Array<SortTuple> | Map<string, 'asc' | 'desc'>;
}
