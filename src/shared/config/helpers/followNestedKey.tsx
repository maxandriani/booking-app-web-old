import { IConfigMap } from '../interfaces/IConfigMap';


export function followNestedKey<T>(key: string, config: IConfigMap): T | null {
  const levels = key.split('.');
  let context = config;

  while (levels.length > 0) {
    const level = levels.shift()!;
    if (levels.length > 1) {
      context = context[level] as IConfigMap;
    } else {
      return context[level] as any as T;
    }
  }

  return null;
}
