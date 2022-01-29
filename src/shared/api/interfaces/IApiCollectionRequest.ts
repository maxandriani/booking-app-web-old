import { IApiCollection } from './IApiCollection';

export type IApiCollectionRequest<TType, TQuery> = (query?: TQuery, abort?: AbortController) => Promise<IApiCollection<TType>>