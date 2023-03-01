import { FC } from 'react';
import { GrGroup } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Project } from '../../apollo/graphql-generated/types';
import { breakPoints } from '../../assets/theme';
import { ERoutePath } from '../../types/enums/routes.enum';

const ListItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgb(255, 255, 255)',
  maxWidth: '320px',
  minWidth: '320px',
  width: '100%',
  height: '150px',
  borderRadius: '5px',
  boxShadow: '0 1px 5px 0 rgba(9, 30, 66, 0.25)',
  transition: 'transform 0.25s ease',
  h5: {
    margin: '0 10px',
    textAlign: 'center',
    width: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  ':hover': {
    cursor: 'pointer',
    boxShadow: '0 5px 10px 0 rgba(9, 30, 66, 0.25)',
    transform: 'scale(1.025)',
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

interface IProjectListItem {
  project: Project;
}

export const ProjectListItem: FC<IProjectListItem> = ({ project }) => {
  const navigate = useNavigate();

  return (
    <ListItem
      onClick={() =>
        navigate(ERoutePath.DASHBOARD.replace(':projectId', project.id))
      }
    >
      {project.shared && <GrGroup size={22} />}
      <h5>{project.name}</h5>
      <small>
        {project.tickets.length}
        {`${project.tickets.length > 1 ? ' tickets' : ' ticket'}`}
      </small>
    </ListItem>
  );
};
