import { IContextStandards } from './IContextStandards';

export interface IAsyncStateStandards<T> extends IContextStandards {
  result?: T,
  error?: Error,
}