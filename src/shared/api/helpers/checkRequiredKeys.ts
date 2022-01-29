export function checkRequiredKeys<TType extends { [key: string]: any }>(obj: TType | undefined, required: Array<keyof TType> | Array<string>) {
  if (required.length > 0 && !!obj && required.map(k => obj.hasOwnProperty(k)).reduce((acc, check) => acc === check, true) === false) {
    throw Error(`Query string is missin required properties: ${required.join(', ')}`);
  }
}