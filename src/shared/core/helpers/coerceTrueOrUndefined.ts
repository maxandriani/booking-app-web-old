export function coerceTrueOrUndefined(val?: boolean): boolean | undefined {
  return (val) ? true : undefined;
}