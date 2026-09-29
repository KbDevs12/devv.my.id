export function reorderObject<T extends Object>(obj: T, order: string[]): T {
  const entries = Object.entries(obj);

  const orderedEntries = [
    ...order
      .filter((key) => key in obj)
      .map((key) => [key, obj[key as keyof T]] as const),

    ...entries.filter(([key]) => !order.includes(key)),
  ];

  return Object.fromEntries(orderedEntries) as T;
}
