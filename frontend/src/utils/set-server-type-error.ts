import EnStrings from './strings';

export type ServerTypeError = keyof typeof EnStrings.ERRORS;

export const sSTE = (errorType: string) => {
  return EnStrings.ERRORS[errorType as ServerTypeError | 'SERVER_ERROR'];
};
