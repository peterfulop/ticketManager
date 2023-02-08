import { FC } from 'react';
import { BiEdit } from 'react-icons/bi';
import styled from 'styled-components';
import { Project } from '../../apollo/graphql-generated/types';
import { breakPoints } from '../../assets/theme';
import { IReact } from '../../types/interfaces/common.interface';

const ListItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'rgb(255, 255, 255)',
  maxWidth: '200px',
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
  justifyContent: 'flex-end',
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

interface IProjectListItem extends IReact {
  project: Project;
  toggle: () => void;
}

export const ProjectListItem: FC<IProjectListItem> = ({ project, toggle }) => {
  return (
    <ListItem
      onClick={() => {
        console.log('most');
      }}
    >
      <EditProjectBtn
        id={project.id}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
      >
        <BiEdit size={22} />
      </EditProjectBtn>
      <h6>{project.name}</h6>
      <p>
        {project.tickets.length}
        {`${project.tickets.length > 1 ? ' tickets' : ' ticket'}`}
      </p>
    </ListItem>
  );
};
