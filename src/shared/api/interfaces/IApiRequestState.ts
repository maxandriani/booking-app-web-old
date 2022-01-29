
export interface IApiRequestState<TType = void> {
  result?: TType;
  isReady: boolean;
  error?: Error;
}
