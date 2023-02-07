import { FC } from 'react';
import styled from 'styled-components';
import { Project } from '../../apollo/graphql-generated/types';
import { breakPoints } from '../../assets/theme';
import { IReact } from '../../types/interfaces/common.interface';

const ListItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  border: '1px solid lightgray',
  backgroundColor: 'lightgray',
  maxWidth: '200px',
  maxHeight: '200px',
  width: '100%',
  height: '100vh',
  borderRadius: '5px',
  cursor: 'pointer',
  ':hover': {
    border: '1px solid gray',
  },
  [`@media screen and (max-width: ${breakPoints.sm})`]: {
    maxWidth: 'none',
    maxHeight: 'none',
    width: '100%',
    height: 'auto',
  },
});

interface IProjectListItem extends IReact {
  project: Project;
}

export const ProjectListItem: FC<IProjectListItem> = ({ project }) => {
  return (
    <ListItem>
      <p>{project.name}</p>
      <p>
        {project.tickets.length}
        {`${project.tickets.length > 1 ? ' tickets' : ' ticket'}`}
      </p>
    </ListItem>
  );
};
