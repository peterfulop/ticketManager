import { useEffect, useState } from 'react';
import {
  Project,
  ProjectCreateInput,
} from '../../apollo/graphql-generated/types';
import { useGetMyProjectsQuery } from '../../apollo/graphql/project/project.generated';
import { MainContainer } from '../../components/main-content/main-content';

import { useNavigate } from 'react-router-dom';
import { ProjectForm } from '../../components/projects/forms/project-form';
import { NewProjectButton } from '../../components/projects/new-project-button';
import { ProjectDetails } from '../../components/projects/project-details';
import { ProjectList } from '../../components/projects/project-list';
import { useModal } from '../../hooks/use-modal.hook';
import { EActionTypes } from '../../types/enums/common.enum';
import { ERoutePath } from '../../types/enums/routes.enum';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [actionType, setActionType] = useState<EActionTypes>(
    EActionTypes.CREATE
  );
  const [selectedId, setSelectedId] = useState<string>('');

  const [projectInitialInputs, setProjectInitialInputs] =
    useState<ProjectCreateInput>({ name: '' });

  const { data, loading, refetch } = useGetMyProjectsQuery({
    fetchPolicy: 'no-cache',
  });

  const { isOpen, toggle } = useModal();

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.getMyProjects.projects) {
      setProjects(data?.getMyProjects.projects as Project[]);
    }
  }, [data]);

  useEffect(() => {
    if (!isOpen) {
      navigate(ERoutePath.PROJECTS);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && actionType !== EActionTypes.READ && (
        <ProjectForm
          toggle={toggle}
          refetch={refetch}
          action={actionType}
          selectedId={selectedId}
          projectInitialInputs={projectInitialInputs}
        />
      )}
      {isOpen && actionType === EActionTypes.READ && (
        <ProjectDetails toggle={toggle} projectId={selectedId} />
      )}
      <MainContainer style={{ display: 'block', padding: '2rem 1rem' }}>
        <NewProjectButton
          toggle={toggle}
          setActionType={setActionType}
          setProjectInitialInputs={setProjectInitialInputs}
        />
        {loading && <p>loading...</p>}
        {!loading && (
          <ProjectList
            setProjectInitialInputs={setProjectInitialInputs}
            setActionType={setActionType}
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
