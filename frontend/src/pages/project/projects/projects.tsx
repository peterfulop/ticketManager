import { FC, useEffect, useState } from 'react';
import { Project } from '../../../apollo/graphql-generated/types';
import { MainContainer } from '../../../components/main-content/main-content';
import { CreateProject } from '../../../components/project/create-project';
import { NewProjectButton } from '../../../components/project/new-project-button';
import { ProjectList } from '../../../components/project/project-list';
import useModal from '../../../hooks/use-modal.hook';
import { useGetMyProjectsQuery } from '../graphql/project.generated';

interface IProjectsPage {}

export const ProjectsPage: FC<IProjectsPage> = () => {
  const { isOpen, toggle } = useModal();
  const [projects, setProjects] = useState<Project[]>([]);

  const { data, loading, error, refetch } = useGetMyProjectsQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (data?.getMyProjects.projects) {
      setProjects(data?.getMyProjects.projects as Project[]);
    }
  }, [data]);

  return (
    <>
      <CreateProject toggle={toggle} isOpen={isOpen} refetch={refetch} />
      <MainContainer style={{ display: 'block', padding: '2rem 1rem' }}>
        <NewProjectButton toggle={toggle} />
        {loading && <p>loading...</p>}
        {!loading && <ProjectList projects={projects} />}
      </MainContainer>
    </>
  );
};
