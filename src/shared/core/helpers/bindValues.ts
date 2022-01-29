/**
 * Altera variáveis em uma string para valores informado em um objeto de chave e valor.
 *
 * As variáveis são marcadas com o caracter (:), e seguidas de um caracter alfabético, podendo conter números a partir do segundo caracter.
 *
```typescript
const text = "Meu texto de exemplo com :variaveis. Também posso usar :variavel1, mas não posso usar :0";

bindValues(text, { variaveis: 'Tags', variavel1: 'números e letras' });
// Meu texto de exemplo com Tags. Também posso usar números e letras, mas não posso usar :0
```
 */
export function bindValues<TType extends { [key: string]: any }>(message: string, values: TType | URLSearchParams, usedKeysOut?: Array<keyof TType> | Array<string>): string {
  const reg = /(?::([a-z]\w*))+/gi;
  let check = reg.exec(message);

  if (check !== null) {
    const params = (values instanceof URLSearchParams) ? values : new URLSearchParams(values);

    while (check !== null) {
      message = message.replace(check[0], params.get(check[1]) || '');
      if (usedKeysOut) {
        usedKeysOut.push(check[1]);
      }
      reg.lastIndex = check.index; // Reset regex to first char of last tag;
      check = reg.exec(message);
    }
  }

  return message;
}