export const textToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};
