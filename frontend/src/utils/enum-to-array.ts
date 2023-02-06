export function enumToArray<T>(e: Record<string, unknown>): T[] {
  return Object.keys(e).map((k) => e[k]) as T[];
}
