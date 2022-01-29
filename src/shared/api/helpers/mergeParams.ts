export function mergeParams(url: string, query: URLSearchParams): string {
  const queryString = query.toString();
  return queryString.length > 0 ? `${url}/?${query.toString()}` : url;
}