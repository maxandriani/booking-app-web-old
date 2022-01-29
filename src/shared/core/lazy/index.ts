import md5 from 'md5';

export enum SuspenseStatus {
  Pending = 0,
  Resolved = 1,
  Rejected = 2
}

export interface ISuspenseState<T> {
  read(): T
}

export function createSuspenser<T>(promise: Promise<T>): ISuspenseState<T> {
  let status = SuspenseStatus.Pending;
  let error: Error;
  let value: T;
  const suspender: Promise<void> = promise
    .then(response => {
      value = response;
      status = SuspenseStatus.Resolved
    })
    .catch(err => {
      error = err;
      status = SuspenseStatus.Rejected
    });

  return {
    read(): T {
      switch (status) {
        case SuspenseStatus.Resolved: return value;
        case SuspenseStatus.Rejected: throw error;
        default: throw suspender;
      }
    }
  }
}

export type SuspenserScope<T> = {
  set: (key: any, factory: () => Promise<T>) => ISuspenseState<T>;
  get: (key: any) => ISuspenseState<T> | undefined;
  getOrDefault: (key: any, factory: () => Promise<T>) => ISuspenseState<T>;
  invalidate: (key?: any) => void;
  clear: () => void;
};

export function createSuspenserScope<T = any>(): SuspenserScope<T> {
  var cache = new Map<string, ISuspenseState<any>>();

  function set(key: any, factory: () => Promise<T>): ISuspenseState<any> {
    const suspenser = createSuspenser(factory());
    cache.set(md5(key), suspenser);
    return suspenser;
  }

  function get(key: any): ISuspenseState<T> | undefined {
    return cache.get(md5(key));
  }

  function getOrDefault<T>(key: any, factory: () => Promise<T>): ISuspenseState<T> {
    const hash = md5(key);
    if (!cache.has(hash)) {
      cache.set(hash, createSuspenser(factory()));
    }
    return cache.get(hash)!;
  }

  function invalidate(key: any) {
    cache.delete(md5(key));
  }

  function clear() {
    cache.clear();
  }

  return {
    set,
    get,
    getOrDefault,
    invalidate,
    clear
  }
}