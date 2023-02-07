import { TEXT } from './translate-objects';
import { Content, Languages } from './translate.scema';

export type ServerTypeError = keyof typeof TEXT.ERRORS;

export const translate = (text: Content, concat?: string, lang?: Languages) => {
  return text[lang ? lang : Languages.ENG].concat(concat || '');
};

export const translateERR = (errorType: string, lang?: Languages) => {
  return TEXT.ERRORS[errorType as ServerTypeError | 'SERVER_ERROR'][
    lang ? lang : Languages.ENG
  ];
};
