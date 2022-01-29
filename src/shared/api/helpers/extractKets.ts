/**
 * Data uma string com variáveis, extrai uma lista com as chaves requeridas.
 *
```typescript
const requiredKeys = extrackKeys('http://domain.com/entity/:parentId/child/:id');
console.log(requiredKeys); // [ 'parentId', 'id' ];
```
 */
export function extractKeys(message: string): Array<string> {
  const reg = /(?::([a-z]\w*))+/gi;
  const keys = [];
  let check = reg.exec(message);

  while (check !== null) {
    keys.push(check[1]);
    // reg.lastIndex = check.index; // Reset regex to first char of last tag;
    check = reg.exec(message);
  }

  return keys;
}