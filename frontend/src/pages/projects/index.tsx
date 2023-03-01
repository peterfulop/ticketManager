import { useState } from 'react';
import { ProjectCreateInput } from '../../apollo/graphql-generated/types';
import { MainContainer } from '../../components/main-content/main-content';

import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { MainButton } from '../../components/component-library/main-button/main-button';
import { ProjectForm } from '../../components/projects/forms/project-form';
import { ProjectList } from '../../components/projects/project-list';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useGetProjectCollabroations } from '../../hooks/collabortation/use-get-project-collaborations.hook';
import { useGetProjects } from '../../hooks/project-hooks/use-get-my-projects.hook';
import { useGetProjectByParams } from '../../hooks/project-hooks/use-get-project-by-params.hook';
import { useModal } from '../../hooks/use-modal.hook';
import { EActionTypes } from '../../types/enums/common.enum';
import { ERoutePath } from '../../types/enums/routes.enum';
import { NotFound } from '../404';

const PROJECT_INITIAL_VALUES: ProjectCreateInput = { name: '', shared: false };

export const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isOpen, toggle } = useModal();

  const [projectInitialValues, setProjectInitialValues] =
    useState<ProjectCreateInput>(PROJECT_INITIAL_VALUES);

  const toggleCallBackFn = () => {
    setProjectInitialValues(PROJECT_INITIAL_VALUES);
    navigate(ERoutePath.PROJECTS);
  };

  const { projects, getProjectsDataLoading, refetchProjects } =
    useGetProjects();

  const { projectCollabs, getProjectCollabDataLoading } =
    useGetProjectCollabroations();

  const { notFound } = useGetProjectByParams({
    projectId: projectId,
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
          action={EActionTypes.CREATE}
          initialValues={projectInitialValues}
          toggleCallBackFn={toggleCallBackFn}
        />
      )}
      <MainContainer style={{ display: 'block', padding: '2rem 1rem' }}>
        <h3 className='d-flex justify-content-start align-items-center gap-2 mb-3'>
          <AiOutlineFundProjectionScreen />
          {translate(TEXT.pages.projects.name)}
        </h3>
        <MainButton
          label={translate(TEXT.forms.projectForms.CREATE.buttons.submitBtn)}
          handleClick={() => {
            toggle();
            setProjectInitialValues(PROJECT_INITIAL_VALUES);
          }}
        >
          <FiPlus size={20} />
        </MainButton>
        {getProjectsDataLoading && <p>{translate(TEXT.general.loading)}</p>}
        {!getProjectsDataLoading && (
          <>
            <ProjectList projects={projects} title={'Your projects:'} />
          </>
        )}
        {!getProjectCollabDataLoading && (
          <ProjectList
            projects={projectCollabs}
            title={'Project collaborations:'}
          />
        )}
      </MainContainer>
    </>
  );
};
