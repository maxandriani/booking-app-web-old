export function strToDateTime(s?: string): Date | null {
  try {
    return !!s ? new Date(s) : null;
  } catch (err) {
    console.warn(err);
    return null;
  }
}