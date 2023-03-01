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
    animation: 'none !important',
  },
  ':disabled': {
    cursor: 'not-allowed',
  },
  ':disabled:hover': {
    border: `1px solid lightgray`,
  },
  [`@media screen and (max-width: ${breakPoints.sm})`]: {
    p: {
      display: 'none',
    },
    maxWidth: 100,
  },
  '@keyframes glowing': {
    '0%': {
      transform: 'scale(1.005)',
    },
    '50%': {
      transform: 'scale(1.05)',
      border: '1px solid green',
      color: 'green',
    },
    '100%': {
      transform: 'scale(1.005)',
    },
  },
});

interface ICreateNewButton extends IReact {
  label: string;
  handleClick: () => void;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
  labelFirst?: boolean;
  glowing?: boolean;
}

export const MainButton: FC<ICreateNewButton> = ({
  label,
  children,
  disabled,
  type,
  labelFirst,
  glowing,
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
        animation: `${glowing && 'glowing 1300ms infinite'}`,
      }}
    >
      {children}
      <p>{label}</p>
    </MainBtn>
  );
};
