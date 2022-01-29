export function encodeParams(params: { [key: string]: any } | Array<[string, any]>): URLSearchParams {
  const response: Array<[string, string]> = [];

  function encode(value: any): string {
    if (value === undefined) {
      return '';
    }
    return JSON.stringify(value).replace(/^"/, '').replace(/"$/, '');
  }

  for (const [key, value] of Object.entries(params)) {
    response.push([key, encode(value)]);
  }

  return new URLSearchParams(response);
}