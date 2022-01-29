/**
 * Dado um path de objeto válido, extrai os segmentos e os converte em um arranjo
 * de strings com o nome das propriedades, índices de vetor ou `[]`* como valores.
 * 
 * Exemplos:
 * ```ts
 * stringToPath('a'); // ['a'];
 * stringToPath('a.b'); // ['a', 'b'];
 * stringToPath('a.b[0]'); // ['a', 'b', 0];
 * stringToPath('[0][1][][2]'); // [0, 1, '[]', 2];
 * ```
 * 
 * Existe um método `toPath()` com a mesma função na lib lodash, porém a versão deles contém muito
 * boilerplate e processamento para casos de uso não usados aqui!
 * 
 * * (representando atribuição em uma coleção)
 */
export function stringToPath(strPath: string): Array<string | number> {
  const extrator = /([^[\].]+)|(\[\])/g;
  const result = [];
  let match: RegExpExecArray | null;

  if (!strPath || strPath === '') throw new TypeError('strToPath(path); Path precisa receber uma string válida. Ex: "a", "a.b" ou "a[0]"');

  // eslint-disable-next-line no-cond-assign
  while (match = extrator.exec(strPath)) {
    if (/^\d+$/.test(match[0])) {
      result.push(parseInt(match[0]));
    } else {
      result.push(match[0]);
    }
  }

  return result;
}