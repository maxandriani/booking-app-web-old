import { IApiQuery } from './IApiQuery';

export interface IApiSortedQuery extends IApiQuery {
  sorting?: string;
}
