import { FC } from 'react';
import styled from 'styled-components';
import { breakPoints } from '../../../assets/theme';
import { IReact } from '../../../types/interfaces/common.interface';

const MainBtn = styled.button({
  background: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '.5rem',
  padding: '.375rem 1rem',
  cursor: 'pointer',
  border: `1px solid lightgray`,
  borderRadius: '5px',
  maxWidth: '220px',
  ':hover': {
    border: `1px solid gray`,
  },
  [`@media screen and (max-width: ${breakPoints.sm})`]: {
    p: {
      display: 'none',
    },
    maxWidth: 100,
  },
});

interface ICreateNewButton extends IReact {
  label: string;
  handleClick: () => void;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
  labelFirst?: boolean;
}

export const MainButton: FC<ICreateNewButton> = ({
  label,
  children,
  disabled,
  type,
  labelFirst,
  handleClick,
}) => {
  return (
    <MainBtn
      type={type}
      disabled={disabled}
      onClick={() => {
        handleClick();
      }}
      style={{
        flexFlow: `${labelFirst && 'row-reverse'}`,
      }}
    >
      {children}
      <p>{label}</p>
    </MainBtn>
  );
};
