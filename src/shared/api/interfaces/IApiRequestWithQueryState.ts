import { IApiQuery } from './IApiQuery';
import { IApiRequestState } from './IApiRequestState';


export interface IApiRequestWithQueryState<TType, TQuery extends IApiQuery> extends IApiRequestState<TType> {
  query?: TQuery;
}
