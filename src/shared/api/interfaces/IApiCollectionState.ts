import { IApiCollection } from './IApiCollection';
import { IApiCollectionActions } from './IApiCollectionActions';
import { IApiRequestWithQueryState } from './IApiRequestWithQueryState';

export interface IApiCollectionState<TType, TQuery> extends IApiRequestWithQueryState<IApiCollection<TType>, TQuery>, IApiCollectionActions<TQuery> { }
