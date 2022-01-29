import { IApiQuery } from './IApiQuery';

export interface IApiCollectionActions<TQuery extends IApiQuery> {
  load(query?: TQuery, abort?: AbortController): void;
  refresh(abort?: AbortController): void;
}
