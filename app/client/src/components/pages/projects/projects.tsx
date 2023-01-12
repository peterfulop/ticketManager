import { Button } from 'react-bootstrap';
import EnStrings from '../../../utilities/strings';
import { MainLayout } from '../../main-layout/main-layout';
import { useGetMyProjectsQuery } from './query/projects.generated';

export const Projects = (): JSX.Element => {
  const { data, error, loading } = useGetMyProjectsQuery();

  if (loading) {
    return <div>{EnStrings.COMMONS.LOADING}</div>;
  }

  if (error || !data) {
    return <div>{EnStrings.SCREENS.POSTS.ERRORS.ERROR_ON_LOADING}</div>;
  }

  const { projects } = data.getMyProjects;

  const currentPATH = window.location.pathname;

  return (
    <MainLayout>
      <h1>Projects</h1>
      {projects?.map((project) => (
        <div key={project?.id}>
          <h2>{project?.name}</h2>
          <p>{project?.createdAt}</p>
          <Button
            href={`${currentPATH}/${project?.id}/tickets`}
            variant="secondary"
            type="button"
          >
            {'Tickets'}
          </Button>
        </div>
      ))}
    </MainLayout>
  );
};
