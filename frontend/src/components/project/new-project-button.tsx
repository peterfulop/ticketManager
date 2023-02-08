import { FC } from 'react';
import { GrAdd } from 'react-icons/gr';
import styled from 'styled-components';
import { breakPoints } from '../../assets/theme';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';

const NewProject = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '.5rem',
  padding: '.5rem',
  cursor: 'pointer',
  border: `1px solid lightgray`,
  borderRadius: '5px',
  maxWidth: 200,
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

interface INewProjectButton {
  toggle: () => void;
}

export const NewProjectButton: FC<INewProjectButton> = ({ toggle }) => {
  return (
    <NewProject onClick={toggle}>
      <GrAdd size={20} />
      <p>{translate(TEXT.forms.createProjectForm.buttons.createProjectBtn)}</p>
    </NewProject>
  );
};
