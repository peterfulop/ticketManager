import { FC } from 'react';
import { GrAdd } from 'react-icons/gr';
import styled from 'styled-components';
import { breakPoints } from '../../assets/theme';

const CreateNew = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '.5rem',
  padding: '.5rem',
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

interface ICreateNewButton {
  label: string;
  toggle: () => void;
  handleClick: () => void;
}

export const CreateNewButton: FC<ICreateNewButton> = ({
  label,
  toggle,
  handleClick,
}) => {
  return (
    <CreateNew
      onClick={() => {
        handleClick();
        toggle();
      }}
    >
      <GrAdd size={20} />
      <p>{label}</p>
    </CreateNew>
  );
};
