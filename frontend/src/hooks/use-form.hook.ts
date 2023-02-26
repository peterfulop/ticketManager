/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface IUseForm {
  callback: () => Promise<unknown>;
  initialState: Record<string, any>;
}

export const useForm = (props: IUseForm) => {
  const [values, setValues] = useState(props.initialState);

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
