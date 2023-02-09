import { FC } from 'react';
import { GrAdd } from 'react-icons/gr';
import styled from 'styled-components';
import { ProjectCreateInput } from '../../apollo/graphql-generated/types';
import { breakPoints } from '../../assets/theme';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { EActionTypes } from '../../types/enums/common.enum';

const NewProject = styled.div({
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

interface INewProjectButton {
  toggle: () => void;
  setActionType: React.Dispatch<React.SetStateAction<EActionTypes>>;
  setProjectInitialInputs: React.Dispatch<
    React.SetStateAction<ProjectCreateInput>
  >;
}

export const NewProjectButton: FC<INewProjectButton> = ({
  toggle,
  setActionType,
  setProjectInitialInputs,
}) => {
  return (
    <NewProject
      onClick={() => {
        setProjectInitialInputs({ name: '' });
        setActionType(EActionTypes.CREATE);
        toggle();
      }}
    >
      <GrAdd size={20} />
      <p>{translate(TEXT.forms.projectForms.CREATE.buttons.submitBtn)}</p>
    </NewProject>
  );
};
