import { FC } from 'react';
import styled from 'styled-components';
import { Project } from '../../apollo/graphql-generated/types';
import { breakPoints } from '../../assets/theme';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { ProjectListItem } from './project-list-item';

const Projects = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  marginTop: '2rem',
});

const List = styled.div({
  marginTop: '.5rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '2rem',
  width: '100%',
  [`@media screen and (max-width: ${breakPoints.sm})`]: {
    flexDirection: 'column',
    gap: '1rem',
  },
});

interface IProjectList {
  projects: Project[];
  title?: string;
}

export const ProjectList: FC<IProjectList> = ({ projects, title }) => {
  return (
    <Projects>
      <h5>{title}</h5>
      <List>
        {projects.length ? (
          projects.map((project, key) => {
            return <ProjectListItem key={key} project={project} />;
          })
        ) : (
          <p>{translate(TEXT.pages.projects.labels.noProjects)}</p>
        )}
      </List>
    </Projects>
  );
};
