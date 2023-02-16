import { useEffect, useState } from 'react';
import {
  Project,
  ProjectCreateInput,
} from '../../apollo/graphql-generated/types';
import { useGetMyProjectsQuery } from '../../apollo/graphql/project/project.generated';
import { MainContainer } from '../../components/main-content/main-content';

import { GrAdd } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../components/component-library/main-button/main-button';
import { ProjectForm } from '../../components/projects/forms/project-form';
import { ProjectDetails } from '../../components/projects/project-details';
import { ProjectList } from '../../components/projects/project-list';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useModal } from '../../hooks/use-modal.hook';
import { EActionTypes } from '../../types/enums/common.enum';
import { ERoutePath } from '../../types/enums/routes.enum';

const PROJECT_INITIAL_VALUES: ProjectCreateInput = { name: '' };

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [actionType, setActionType] = useState<EActionTypes>(
    EActionTypes.CREATE
  );
  const [selectedId, setSelectedId] = useState<string>('');

  const [projectInitialValues, setProjectInitialValues] =
    useState<ProjectCreateInput>(PROJECT_INITIAL_VALUES);

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
          initialValues={projectInitialValues}
        />
      )}
      {isOpen && actionType === EActionTypes.READ && (
        <ProjectDetails toggle={toggle} projectId={selectedId} />
      )}
      <MainContainer style={{ display: 'block', padding: '2rem 1rem' }}>
        <h3 className='mb-3'>{translate(TEXT.pages.projects.name)}</h3>
        <MainButton
          label={translate(TEXT.forms.projectForms.CREATE.buttons.submitBtn)}
          toggle={toggle}
          handleClick={() => {
            setActionType(EActionTypes.CREATE);
            setProjectInitialValues(PROJECT_INITIAL_VALUES);
          }}
        >
          <GrAdd />
        </MainButton>
        {loading && <p>loading...</p>}
        {!loading && (
          <ProjectList
            setProjectInitialInputs={setProjectInitialValues}
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
