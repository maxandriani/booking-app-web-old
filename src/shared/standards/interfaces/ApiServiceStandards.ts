import { IApiCollection } from '../../api/interfaces/IApiCollection';
import { IEntityKey } from './IEntityKey';

export type IGetFn<TResult, TKeys = IEntityKey> = (keys: TKeys, abort?: AbortController) => Promise<TResult>;
export type IGetCollectionFn<TResult, TQuery = { [key: string]: any }> = (query?: TQuery, abort?: AbortController) => Promise<IApiCollection<TResult>>;
export type ICreateFn<TResult, TData = { [key: string]: any }> = (values: TData) => Promise<TResult>;
export type IUpdateFn<TResult, TKey = IEntityKey, TData = { [key: string]: any }> = (keys: TKey, data: TData) => Promise<TResult>;
export type IDeleteFn<TKey = IEntityKey> = (keys: TKey) => Promise<void>;

export type IReadonlyApiService<TResult, TKey = IEntityKey, TQuery = { [key: string]: any }> = {
  get: IGetFn<TResult, TKey>;
  load: IGetCollectionFn<TResult, TQuery>;
};

export type ICrudApiService<TResult, TKey = IEntityKey, TQuery = { [key: string]: any }, TCreateData = TResult, TUpdateData = TCreateData, TCreateResult = TResult, TUpdateResult = TResult> = {
  create: ICreateFn<TCreateResult, TCreateData>;
  update: IUpdateFn<TUpdateResult, TKey, TUpdateData>;
  delete: IDeleteFn<TKey>;
} & IReadonlyApiService<TResult, TKey, TQuery>;