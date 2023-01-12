export const generateSequenceId = (params: {
  name: string;
  sequence: number;
  chars?: number;
}) => {
  return params.name
    .slice(0, 3)
    .toUpperCase()
    .concat('-', params.sequence.toString().padStart(params.chars || 4, '0'));
};
