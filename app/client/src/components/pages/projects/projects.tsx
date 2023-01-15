import { Project } from '../../../apollo/graphql-generated/types';
import EnStrings from '../../../utilities/strings';
import { MainLayout } from '../../component-library/main-layout/main-layout';
import { ProjectItem } from '../../component-library/project-tem/project-item';
import './Projects.css';
import { useGetMyProjectsQuery } from './query/projects.generated';

import { GrAdd } from 'react-icons/gr';

export const Projects = (): JSX.Element => {
  const { data, error, loading } = useGetMyProjectsQuery();

  if (loading) {
    return <div>{EnStrings.COMMONS.LOADING}</div>;
  }

  if (error || !data) {
    return <div>{EnStrings.SCREENS.POSTS.ERRORS.ERROR_ON_LOADING}</div>;
  }

  const { projects } = data.getMyProjects;

  if (!projects) {
    return <>No Projects jet...</>;
  }

  const currentPath = window.location.pathname;

  return (
    <MainLayout>
      <h1>Projects</h1>
      <section className="projects-section">
        <div className="new-project">
          <GrAdd size={40} />
        </div>
        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            projectItem={project as Project}
            currentPath={currentPath}
          />
        ))}
      </section>
    </MainLayout>
  );
};
