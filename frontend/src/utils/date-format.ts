export const dateFormat = (date: string | number) => {
  return new Date(Number(date)).toLocaleDateString();
};
