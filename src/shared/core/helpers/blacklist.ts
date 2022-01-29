/**
 * Remove atributos de um objeto puro de chave e valor de forma não recursiva, dado uma lista de
 * string de chaves do objeto.
 *
 * ***Atenção:*** O objeto retornado será uma nova instância, ou seja, não serão feitas alterações
 * no objeto original.
 *
```typescript
const obj = { id: 1, name: 'Jonas', parentId: 10 };
const forbiden = [ 'id', 'parentId' ];

blacklist(obj, forbiden); // { name: 'Jonas' };
```
 */
export function blacklist<TType>(obj: TType, keys: Array<keyof TType>): Partial<TType> {
  const blacklisted: { [key: string]: any } = {};
  const set = new Set(keys);

  for (const [key, value] of Object.entries(obj)) {
    if (!set.has(key as keyof TType)) {
      blacklisted[key] = value;
    }
  }

  return blacklisted as Partial<TType>;
}