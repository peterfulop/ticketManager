import { useState } from 'react';
import { Col } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';
import { GrGroup } from 'react-icons/gr';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { SlRocket } from 'react-icons/sl';
import { TbLayoutDashboard } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectCreateInput } from '../../apollo/graphql-generated/types';
import { MainButton } from '../../components/component-library/main-button/main-button';
import { DashboardContent } from '../../components/dashboard/dashboard-content';
import { MainContainer } from '../../components/main-content/main-content';
import { ProjectForm } from '../../components/projects/forms/project-form';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useGetProjectData } from '../../hooks/project-hooks/use-get-project-data.hook';
import { useModal } from '../../hooks/use-modal.hook';
import { EActionTypes } from '../../types/enums/common.enum';
import { ERoutePath } from '../../types/enums/routes.enum';
import { NotFound } from '../404';
export type DashboardModal =
  | 'ProjectForm'
  | 'TicketForm'
  | 'SprintForm'
  | 'MemberForm';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isOpen, toggle } = useModal();

  const { project, errorMessage, refetchProjectData } = useGetProjectData({
    projectId: projectId as string,
  });

  const [dashboardModal, setDashboardModal] =
    useState<DashboardModal>('ProjectForm');

  const toggleCallBackFn = async () => {
    setDashboardModal('ProjectForm');
    toggle();
  };

  if (errorMessage || !project) {
    return <NotFound />;
  }

  return (
    <>
      {dashboardModal === 'ProjectForm' && isOpen && (
        <ProjectForm
          toggle={toggle}
          refetch={refetchProjectData}
          action={EActionTypes.UPDATE}
          initialValues={project as ProjectCreateInput}
          toggleCallBackFn={toggleCallBackFn}
        />
      )}

      {project && (
        <MainContainer style={{ display: 'block', padding: '2rem 1rem' }}>
          <h3 className='d-flex justify-content-start align-items-center gap-2 mb-3'>
            <TbLayoutDashboard /> {translate(TEXT.pages.dashboard.name)}
            <span className='fw-light'>{project?.name}</span>
            {project.shared && <GrGroup size={22} />}
          </h3>
          <div className='d-flex justify-content-between gap-2'>
            <Col className='d-flex gap-3'>
              <MainButton
                label='back to projects'
                handleClick={() => {
                  navigate(ERoutePath.PROJECTS);
                }}
              >
                <MdOutlineArrowBackIos />
              </MainButton>
              <MainButton
                label='settings'
                handleClick={() => {
                  setDashboardModal('ProjectForm');
                  toggle();
                }}
              >
                <FaCog />
              </MainButton>
            </Col>
            <Col className='d-flex justify-content-end'>
              <MainButton
                label='Go to work!'
                labelFirst={true}
                handleClick={() => {
                  navigate(
                    ERoutePath.TICKETS.replace(
                      ':projectId',
                      projectId as string
                    )
                  );
                }}
              >
                <SlRocket />
              </MainButton>
            </Col>
          </div>
          <DashboardContent
            project={project}
            refetch={refetchProjectData}
            toggle={toggle}
            setDashboardModal={setDashboardModal}
          />
        </MainContainer>
      )}
    </>
  );
};
