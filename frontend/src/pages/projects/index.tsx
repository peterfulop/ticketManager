import { useState } from 'react';
import { ProjectCreateInput } from '../../apollo/graphql-generated/types';
import { MainContainer } from '../../components/main-content/main-content';

import { GrAdd } from 'react-icons/gr';
import { useNavigate, useParams } from 'react-router-dom';
import { MainButton } from '../../components/component-library/main-button/main-button';
import { ProjectForm } from '../../components/projects/forms/project-form';
import { ProjectList } from '../../components/projects/project-list';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useGetProjectByParams } from '../../hooks/project-hooks/use-get-project-by-params.hook';
import { useGetProjects } from '../../hooks/project-hooks/use-get-projects.hook';
import { useModal } from '../../hooks/use-modal.hook';
import { EActionTypes } from '../../types/enums/common.enum';
import { ERoutePath } from '../../types/enums/routes.enum';
import { NotFound } from '../404';

const PROJECT_INITIAL_VALUES: ProjectCreateInput = { name: '' };

export const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isOpen, toggle } = useModal();
  const [actionType, setActionType] = useState<EActionTypes>(
    EActionTypes.CREATE
  );

  const [projectInitialValues, setProjectInitialValues] =
    useState<ProjectCreateInput>(PROJECT_INITIAL_VALUES);

  const toggleCallBackFn = () => {
    setActionType(EActionTypes.CREATE);
    setProjectInitialValues(PROJECT_INITIAL_VALUES);
    navigate(ERoutePath.PROJECTS);
  };

  const { projects, getProjectsDataLoading, refetchProjects } =
    useGetProjects();

  const { notFound } = useGetProjectByParams({
    projectId: projectId,
    setActionType,
    setProjectInitialValues,
    callBackFn: () => {
      if (!isOpen) {
        toggle();
      }
    },
  });

  if (notFound) {
    return <NotFound />;
  }

  return (
    <>
      {isOpen && (
        <ProjectForm
          toggle={toggle}
          refetch={refetchProjects}
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
        {getProjectsDataLoading && <p>{translate(TEXT.general.loading)}</p>}
        {!getProjectsDataLoading && <ProjectList projects={projects} />}
      </MainContainer>
    </>
  );
};
