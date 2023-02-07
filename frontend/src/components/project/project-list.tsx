import { FC } from 'react';
import styled from 'styled-components';
import { Project } from '../../apollo/graphql-generated/types';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { IReact } from '../../types/interfaces/common.interface';
import { ProjectListItem } from './project-list-item';

const Projects = styled.div({
  display: 'block',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '2rem',
  width: '100%',
});

interface IProjectList extends IReact {
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
