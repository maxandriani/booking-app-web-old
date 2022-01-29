
export function parseSortMap(sort?: string): Map<string, 'asc' | 'desc'> {
  if (!sort)
    return new Map();

  function parse(s: string): 'asc' | 'desc' {
    return s === 'asc' ? 'asc' : 'desc';
  }

  return sort
    .split(',')
    .map(s => s.trim())
    .map(s => s.split(' '))
    .map(([key, value]) => [key, parse(value)])
    .reduce((map, [key, value]) => {
      map.set(key, value);
      return map;
    }, new Map());
}