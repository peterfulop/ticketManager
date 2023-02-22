import { useEffect, useState } from 'react';
import {
  Project,
  ProjectCreateInput,
} from '../../apollo/graphql-generated/types';
import {
  useGetMyProjectQuery,
  useGetMyProjectsQuery,
} from '../../apollo/graphql/project/project.generated';
import { MainContainer } from '../../components/main-content/main-content';

import { GrAdd } from 'react-icons/gr';
import { useNavigate, useParams } from 'react-router-dom';
import { MainButton } from '../../components/component-library/main-button/main-button';
import { ProjectForm } from '../../components/projects/forms/project-form';
import { ProjectList } from '../../components/projects/project-list';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useUserAuthentication } from '../../hooks/use-logging-out-user.hook';
import { useModal } from '../../hooks/use-modal.hook';
import { EActionTypes } from '../../types/enums/common.enum';
import { ERoutePath } from '../../types/enums/routes.enum';

const PROJECT_INITIAL_VALUES: ProjectCreateInput = { name: '' };

export const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isOpen, toggle } = useModal();
  const [projects, setProjects] = useState<Project[]>([]);
  const [actionType, setActionType] = useState<EActionTypes>(
    EActionTypes.CREATE
  );

  const [projectInitialValues, setProjectInitialValues] =
    useState<ProjectCreateInput>(PROJECT_INITIAL_VALUES);

  const {
    data: projectsData,
    loading: getProjectsDataLoading,
    error: getProjectsError,
    refetch,
  } = useGetMyProjectsQuery({
    fetchPolicy: 'no-cache',
  });

  const {
    data: projectData,
    error: getProjectError,
    loading: getProjectDataLoading,
  } = useGetMyProjectQuery({
    fetchPolicy: 'no-cache',
    variables: {
      id: projectId as string,
    },
    skip: !projectId,
  });

  const loading = getProjectsDataLoading || getProjectDataLoading;

  const { checkErrorMessage } = useUserAuthentication();

  const toggleCallBackFn = () => {
    setActionType(EActionTypes.CREATE);
    setProjectInitialValues(PROJECT_INITIAL_VALUES);
    navigate(ERoutePath.PROJECTS);
  };

  useEffect(() => {
    const data = projectsData?.getMyProjects.projects;
    const errors = projectsData?.getMyProjects.userErrors;

    if (!getProjectsDataLoading && errors && errors?.length > 0) {
      checkErrorMessage(errors[0].message);
    }
    if (!getProjectsDataLoading && data) {
      setProjects(data as Project[]);
    }
  }, [projectsData]);

  useEffect(() => {
    if (projectId) {
      const data = projectData?.getMyProject.project;
      const errors = projectData?.getMyProject.userErrors;

      if (!getProjectDataLoading && errors && errors?.length > 0) {
        checkErrorMessage(errors[0].message);
      }
      if (!getProjectDataLoading && data) {
        setActionType(EActionTypes.UPDATE);
        setProjectInitialValues(data);
        if (!isOpen) {
          toggle();
        }
      }
    } else {
    }
  }, [projectData]);

  return (
    <>
      {isOpen && (
        <ProjectForm
          toggle={toggle}
          refetch={refetch}
          action={actionType}
          initialValues={projectInitialValues}
          toggleCallBackFn={toggleCallBackFn}
        />
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
        {loading && <p>{translate(TEXT.general.loading)}</p>}
        {!loading && <ProjectList projects={projects} />}
      </MainContainer>
    </>
  );
};
