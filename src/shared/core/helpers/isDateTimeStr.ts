export function isDateTimeStr(v: string): boolean {
  return /^\d+-\d+-\d+(?:T\d+:\d+:\d+)?(?:\.\d+(?:\w|\+\d+:\d+))?$/.test(`${v}`);
}

// 2021-10-26T14:39:05.369Z
// 2021-10-26T14:39:05.369+00:00