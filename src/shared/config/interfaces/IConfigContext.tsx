import { IConfigMap } from "./IConfigMap";

export interface IConfigContext {
  config: IConfigMap;

  getConfig<T>(key: string, fallback: T): T;
  getConfig<T>(key: string): T | null;
}
