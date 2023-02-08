import { FC, useEffect, useState } from 'react';
import {
  Project,
  ProjectCreateInput,
} from '../../../apollo/graphql-generated/types';
import { useGetMyProjectsQuery } from '../../../apollo/graphql/project/project.generated';
import { MainContainer } from '../../../components/main-content/main-content';
import { ProjectForm } from '../../../components/project/forms/project-form';
import { NewProjectButton } from '../../../components/project/new-project-button';
import { ProjectList } from '../../../components/project/project-list';
import { useModal } from '../../../hooks/use-modal.hook';
import { EMutationTypes } from '../../../types/enums/common.enum';

interface IProjectsPage {}

export const ProjectsPage: FC<IProjectsPage> = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [mutationType, setMutationType] = useState<EMutationTypes>(
    EMutationTypes.CREATE
  );
  const [selectedId, setSelectedId] = useState<string>('');

  const [projectInitialInputs, setProjectInitialInputs] =
    useState<ProjectCreateInput>({ name: '' });

  const { data, loading, refetch } = useGetMyProjectsQuery({
    fetchPolicy: 'no-cache',
  });

  const { isOpen, toggle } = useModal();

  useEffect(() => {
    if (data?.getMyProjects.projects) {
      setProjects(data?.getMyProjects.projects as Project[]);
    }
  }, [data]);

  return (
    <>
      {isOpen && (
        <ProjectForm
          toggle={toggle}
          refetch={refetch}
          mutation={mutationType}
          selectedId={selectedId}
          projectInitialInputs={projectInitialInputs}
        />
      )}
      <MainContainer style={{ display: 'block', padding: '2rem 1rem' }}>
        <NewProjectButton
          toggle={toggle}
          setMutationType={setMutationType}
          setProjectInitialInputs={setProjectInitialInputs}
        />
        {loading && <p>loading...</p>}
        {!loading && (
          <ProjectList
            setProjectInitialInputs={setProjectInitialInputs}
            setMutationType={setMutationType}
            setSelectedId={setSelectedId}
            toggle={toggle}
            selectedId={selectedId}
            projects={projects}
          />
        )}
      </MainContainer>
    </>
  );
};
