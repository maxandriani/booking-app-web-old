import httpClient from '../../api/services/httpClient';
import { followNestedKey } from '../helpers/followNestedKey';
import { IConfigMap } from '../interfaces/IConfigMap';

const GLOBAL_STORE: { config: IConfigMap } = {
  config: {}
};

export function loadConfig(abort?: AbortSignal): Promise<IConfigMap> {
  return (abort
    ? httpClient
      .withAbort(abort)
    : httpClient)
    .fetch('/config/config.json')
    .then(response => response.json())
    .then(config => GLOBAL_STORE.config = config);
}

export function getConfig(): IConfigMap {
  return Object.assign({}, GLOBAL_STORE.config);
}

export function getByPath<T>(path: string): T | null {
  return followNestedKey(path, GLOBAL_STORE.config);
}

const configService = {
  load: loadConfig,
  getConfig,
  getByPath
};

export default configService;