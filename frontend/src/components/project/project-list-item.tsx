import { FC } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import styled from 'styled-components';
import {
  Project,
  ProjectCreateInput,
} from '../../apollo/graphql-generated/types';
import { breakPoints } from '../../assets/theme';
import { EMutationTypes } from '../../types/enums/common.enum';
import { IReact, MutationProps } from '../../types/interfaces/common.interface';

const ListItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'rgb(255, 255, 255)',
  maxWidth: '220px',
  minWidth: '220px',
  width: '100%',
  padding: '10px 10px 30px 10px',
  borderRadius: '5px',
  boxShadow: '0 1px 5px 0 rgba(9, 30, 66, 0.25)',
  transition: 'transform 0.25s ease',
  ':hover': {
    boxShadow: '0 5px 10px 0 rgba(9, 30, 66, 0.25)',
    transform: 'scale(1.025)',
  },
  ':hover :first-of-type': {
    visibility: 'visible',
  },
  [`@media screen and (max-width: ${breakPoints.sm})`]: {
    maxWidth: 'none',
    maxHeight: 'none',
    width: '100%',
    height: 'auto',
    ':hover': {
      transform: 'scale(1)',
    },
  },
});

const EditProjectBtn = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '.5rem',
  width: '100%',
  marginBottom: '5px',
  svg: {
    color: 'gray',
  },
  'svg:hover ': {
    cursor: 'pointer',
    color: 'black',
  },
  visibility: 'hidden',
});

interface IProjectListItem extends IReact, MutationProps {
  project: Project;
  toggle: () => void;
  setProjectInitialInputs: React.Dispatch<
    React.SetStateAction<ProjectCreateInput>
  >;
}

export const ProjectListItem: FC<IProjectListItem> = ({
  project,
  toggle,
  setSelectedId,
  setMutationType,
  setProjectInitialInputs,
}) => {
  return (
    <ListItem
      onClick={() => {
        console.log('most');
      }}
    >
      <EditProjectBtn>
        <BiEdit
          size={22}
          style={{
            marginTop: '2px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedId(project.id);
            setProjectInitialInputs({ name: project.name });
            setMutationType(EMutationTypes.UPDATE);
            toggle();
          }}
        />
        <MdDeleteOutline
          size={22}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedId(project.id);
            setProjectInitialInputs({ name: project.name });
            setMutationType(EMutationTypes.DELETE);
            toggle();
          }}
        />
      </EditProjectBtn>
      <h6>{project.name}</h6>
      <p>
        {project.tickets.length}
        {`${project.tickets.length > 1 ? ' tickets' : ' ticket'}`}
      </p>
    </ListItem>
  );
};
