import { IEntityKey } from './IEntityKey';

export type StandardFormProps<TResult, TKeys = IEntityKey, TData = Partial<TResult>> = {
  formId?: string;
  keys?: TKeys;
  values?: TData;
  onSubmitting?: () => void;
  onSubmitted?: (values: TResult) => void;
  onError?: (error: Error) => void;
}