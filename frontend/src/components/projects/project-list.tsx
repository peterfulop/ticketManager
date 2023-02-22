import { FC } from 'react';
import styled from 'styled-components';
import { Project } from '../../apollo/graphql-generated/types';
import { breakPoints } from '../../assets/theme';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { ProjectListItem } from './project-list-item';

const Projects = styled.div({
  marginTop: '2rem',
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
}

export const ProjectList: FC<IProjectList> = ({ projects }) => {
  return (
    <Projects>
      {projects.length ? (
        projects.map((project, key) => {
          return <ProjectListItem key={key} project={project} />;
        })
      ) : (
        <p>{translate(TEXT.pages.projects.labels.noProjects)}</p>
      )}
    </Projects>
  );
};
