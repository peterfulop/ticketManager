import { FC } from 'react';
import { BiEdit, BiInfoSquare } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Project,
  ProjectCreateInput,
} from '../../apollo/graphql-generated/types';
import { breakPoints, theme } from '../../assets/theme';
import { EActionTypes } from '../../types/enums/common.enum';
import { ERoutePath } from '../../types/enums/routes.enum';
import { IReact, MutationProps } from '../../types/interfaces/common.interface';

const ListItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgb(255, 255, 255)',
  maxWidth: '220px',
  minWidth: '220px',
  width: '100%',
  paddingTop: '30px',
  borderRadius: '5px',
  boxShadow: '0 1px 5px 0 rgba(9, 30, 66, 0.25)',
  transition: 'transform 0.25s ease',
  h5: {
    margin: 0,
  },
  ':hover': {
    cursor: 'pointer',
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

const ProjectActions = styled.div({
  width: '100%',
  background: theme.colors.G10,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '5px',
  gap: '1rem',
  svg: {
    color: 'white',
  },
  'svg:hover ': {
    cursor: 'pointer',
    color: 'tomato',
  },
  visibility: 'hidden',
  padding: '5px',
  borderBottomLeftRadius: '5px',
  borderBottomRightRadius: '5px',
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
  setActionType,
  setProjectInitialInputs,
}) => {
  const navigate = useNavigate();

  return (
    <ListItem
      onClick={() => {
        navigate(ERoutePath.TICKETS.replace(':projectId', project.id));
      }}
    >
      <h5>{project.name}</h5>
      <small>
        {project.tickets.length}
        {`${project.tickets.length > 1 ? ' tickets' : ' ticket'}`}
      </small>
      <ProjectActions>
        <BiInfoSquare
          size={22}
          onClick={(e) => {
            navigate(
              ERoutePath.PROJECTS_DETAILS.replace(':projectId', project.id)
            );
            e.stopPropagation();
            setSelectedId(project.id);
            setActionType(EActionTypes.READ);
            toggle();
          }}
        />
        <BiEdit
          size={22}
          onClick={(e) => {
            navigate(
              ERoutePath.PROJECTS_DETAILS.replace(':projectId', project.id)
            );
            e.stopPropagation();
            setSelectedId(project.id);
            setProjectInitialInputs({ name: project.name });
            setActionType(EActionTypes.UPDATE);
            toggle();
          }}
        />
        <MdDeleteOutline
          size={22}
          onClick={(e) => {
            navigate(
              ERoutePath.PROJECTS_DETAILS.replace(':projectId', project.id)
            );
            e.stopPropagation();
            setSelectedId(project.id);
            setProjectInitialInputs({ name: project.name });
            setActionType(EActionTypes.DELETE);
            toggle();
          }}
        />
      </ProjectActions>
    </ListItem>
  );
};
