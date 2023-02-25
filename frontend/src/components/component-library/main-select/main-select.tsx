import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { MainSelectOption } from '../../../types';
import { IReact } from '../../../types/interfaces/common.interface';

interface IMainSelect extends IReact {
  options: MainSelectOption[];
  id?: string;
  name?: string;
  value?: string | number | readonly string[];
  disabled?: boolean;
  style?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export const MainSelect: FC<IMainSelect> = ({
  id,
  name,
  options,
  value,
  disabled,
  style,
  children,
  onChange,
}) => {
  return (
    <div className='d-flex justify-content-end align-items-center gap-2 w-100'>
      <label>{children}</label>
      <Form.Select
        name={name}
        id={id}
        defaultValue={value}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
        disabled={disabled}
        style={style}
      >
        {options.map((value, key) => (
          <option key={key} value={value.value}>
            {value.content}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};
