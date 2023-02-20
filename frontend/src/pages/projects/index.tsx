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
  const [selectedId, setSelectedId] = useState<string>('');

  const [projectInitialValues, setProjectInitialValues] =
    useState<ProjectCreateInput>(PROJECT_INITIAL_VALUES);

  const { data, loading, refetch } = useGetMyProjectsQuery({
    fetchPolicy: 'no-cache',
  });

  const { data: projectData } = useGetMyProjectQuery({
    fetchPolicy: 'no-cache',
    variables: {
      id: projectId as string,
    },
    skip: !projectId,
  });

  const toggleCallBackFn = () => {
    setActionType(EActionTypes.CREATE);
    setProjectInitialValues(PROJECT_INITIAL_VALUES);
    navigate(ERoutePath.PROJECTS);
  };

  useEffect(() => {
    if (data?.getMyProjects.projects) {
      setProjects(data?.getMyProjects.projects as Project[]);
    }
  }, [data?.getMyProjects.projects]);

  useEffect(() => {
    if (projectId) {
      if (projectData?.getMyProject.project) {
        setActionType(EActionTypes.UPDATE);
        setProjectInitialValues(projectData.getMyProject.project);
        if (!isOpen) {
          toggle();
        }
      }
    }
  }, [projectData?.getMyProject.project]);

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
