import { FC } from 'react';
import styled from 'styled-components';
import { breakPoints } from '../../../assets/theme';
import { IReact } from '../../../types/interfaces/common.interface';

const MainBtn = styled.button({
  background: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '.5rem',
  padding: '.5rem 1rem',
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
  toggle?: () => void;
  handleClick: () => void;
}

export const MainButton: FC<ICreateNewButton> = ({
  label,
  children,
  toggle,
  handleClick,
}) => {
  return (
    <MainBtn
      onClick={() => {
        handleClick();
        if (toggle) toggle();
      }}
    >
      {children}
      <p>{label}</p>
    </MainBtn>
  );
};
