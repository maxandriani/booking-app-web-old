import { IApiQuery } from './IApiQuery';

export interface IApiPagedQuery extends IApiQuery {
  skipCount?: number;
  maxResultCount?: number;
}
