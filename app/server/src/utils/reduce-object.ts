export const reduceObjectBy = (
  object: Record<string, unknown>,
  nulls?: boolean
) => {
  return Object.entries(object)
    .filter((f) => (nulls ? !f[1] : f[1]))
    .reduce((obj, key) => {
      obj[key[0]] = key[1];
      return obj;
    }, {} as Record<string, unknown>);
};
