const GLOBAL_HEADERS = new Headers({
  'Accept': 'application/json'
});

function castToHeaders(init: HeadersInit): Headers {
  return new Headers(init);
}

function mergeHeaders(left: HeadersInit, right?: HeadersInit): Headers {
  if (!right) {
    return castToHeaders(left);
  }

  left = castToHeaders(left);
  right = castToHeaders(right);

  for (const key of Object.keys(right)) {
    left.set(key, right.get(key)!);
  }

  return left;
}

function coerceRequestInfo(input: RequestInfo, init?: RequestInit) {
  if (input instanceof Request) {
    return { input: input.url, init: Object.assign({}, input, init ?? {}) }
  }
  return { input: input, init: init ?? {} };
}

export function setGlobalHeader(key: string, value: string) {
  GLOBAL_HEADERS.set(key, value);
}

export function getGlobalHeader(key: string): string | null {
  return GLOBAL_HEADERS.get(key);
}

export function appendGlobalHeader(key: string, value: string) {
  GLOBAL_HEADERS.append(key, value);
}

export function deleteGlobalHeader(key: string) {
  GLOBAL_HEADERS.delete(key);
}

function apiFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const { input: finalInput, init: finalInit } = coerceRequestInfo(input, init);

  // Apply Headers
  if (['put', 'post'].indexOf(finalInit.method?.toLowerCase() ?? '') >= 0) {
    finalInit.headers = {
      'Content-Type': 'application/json',
      ...finalInit.headers ?? {}
    };
  }

  finalInit.headers = mergeHeaders(GLOBAL_HEADERS, finalInit.headers);

  return fetch(finalInput, finalInit);
}

function createAbortController(): AbortController {
  return new AbortController();
}

function withAbort(signal: AbortSignal) {
  return {
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
      const { input: finalInput, init: finalInit } = coerceRequestInfo(input, init);
      finalInit.signal = signal;
      return apiFetch(finalInput, finalInit);
    }
  }
}

const httpClient = {
  fetch: apiFetch,
  createAbortController,
  withAbort
};

export default httpClient;