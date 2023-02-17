import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { MainSelectOption } from '../../../types';

interface IMainSelect {
  id?: string;
  name?: string;
  options: MainSelectOption[];
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export const MainSelect: FC<IMainSelect> = ({
  id,
  name,
  options,
  value,
  onChange,
}) => {
  return (
    <Form.Select
      name={name}
      id={id}
      defaultValue={value}
      onChange={onChange}
      onClick={(e) => e.stopPropagation()}
    >
      {options.map((value, key) => (
        <option key={key} value={value.value}>
          {value.content}
        </option>
      ))}
    </Form.Select>
  );
};
