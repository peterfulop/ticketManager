import { FC } from 'react';
import { BiEdit } from 'react-icons/bi';
import { GrGroup } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Project } from '../../apollo/graphql-generated/types';
import { breakPoints, theme } from '../../assets/theme';
import { ERoutePath } from '../../types/enums/routes.enum';

const ListItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgb(255, 255, 255)',
  maxWidth: '320px',
  minWidth: '320px',
  width: '100%',
  height: '150px',
  paddingTop: '30px',
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

const TicketsBtn = styled.div({
  width: '100%',
  background: theme.colors.G10,
  color: 'white',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '5px',
  gap: '1rem',
  svg: {
    color: 'white',
  },
  ':hover svg': {
    cursor: 'pointer',
    color: '#ffc107',
  },
  visibility: 'hidden',
  padding: '5px',
  borderBottomLeftRadius: '5px',
  borderBottomRightRadius: '5px',
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
      <TicketsBtn
        onClick={(e) => {
          navigate(
            ERoutePath.PROJECTS_DETAILS.replace(':projectId', project.id)
          );
          e.stopPropagation();
        }}
      >
        <BiEdit size={22} />
      </TicketsBtn>
    </ListItem>
  );
};
