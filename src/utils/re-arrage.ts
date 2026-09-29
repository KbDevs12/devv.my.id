function reorderObject<T extends Record<string, unknown>>(
  obj: T,
  order: string[],
): T {
  const result: Record<string, unknown> = {};

  for (const key of order) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  for (const key of Object.keys(obj)) {
    if (!(key in result)) {
      result[key] = obj[key];
    }
  }

  return result as T;
}
