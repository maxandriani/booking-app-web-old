import { SortTuple } from '../interfaces/SortTuple';


export function serializeSortMap(sort?: Array<SortTuple> | Map<string, 'asc' | 'desc'>): string | undefined {
  if (!sort)
    return undefined;

  return Array.from(sort)
    .map(([prop, direction]) => `${prop} ${direction}`)
    .join(', ');
}
