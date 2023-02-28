export const DateFormat = (date?: string) => {
  if (date) return new Date(date).toLocaleString();
};
