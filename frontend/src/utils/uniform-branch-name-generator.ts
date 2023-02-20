export const uniformBranchNameGenerator = (props: {
  title: string;
  sequenceId: string;
}) => {
  const title = props.title
    .replace(/  +/g, ' ')
    .trim()
    .replaceAll(' ', '-')
    .toLowerCase();
  return props.sequenceId.concat('-', title);
};
