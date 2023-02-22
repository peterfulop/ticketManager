import { MainSelectOption, Option } from '../types';

export const setSelectOptions = (object: Record<string | number, Option>) => {
  return Object.entries(object).map((obj) => {
    return {
      value: obj[0],
      content: obj[1].title,
    } as MainSelectOption;
  });
};
