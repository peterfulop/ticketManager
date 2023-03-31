import { useState } from 'react';
import { Col } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';
import { GrGroup } from 'react-icons/gr';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { SlRocket } from 'react-icons/sl';
import { TbLayoutDashboard } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ProjectCreateInput,
  SprintCreateInput,
  TicketCreateInput,
  TicketPriority,
  TicketStatus,
  TicketType,
} from '../../apollo/graphql-generated/types';
import { MainButton } from '../../components/component-library/main-button/main-button';
import { DashboardContent } from '../../components/dashboard/dashboard-content';
import { SprintForm } from '../../components/dashboard/sprints/form/sprint-form';
import { MainContainer } from '../../components/main-content/main-content';
import { ProjectForm } from '../../components/projects/forms/project-form';
import { TicketForm } from '../../components/tickets/form/ticket-form';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useGetProjectData } from '../../hooks/project-hooks/use-get-project-data.hook';
import { useGetTicketByParams } from '../../hooks/ticket-hooks/use-get-ticket-by-params.hook';
import { useModal } from '../../hooks/use-modal.hook';
import { EActionTypes } from '../../types/enums/common.enum';
import { ERoutePath } from '../../types/enums/routes.enum';
import { NotFound } from '../404';
export type DashboardModalState =
  | 'ProjectForm'
  | 'TicketForm'
  | 'SprintForm'
  | 'MemberForm';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { projectId, ticketId } = useParams();

  const TICKET_INITIAL_INPUT: TicketCreateInput = {
    description: '',
    priority: TicketPriority.MEDIUM,
    projectId: projectId || '',
    references: [],
    status: TicketStatus.TO_DO,
    storyPoints: 1,
    title: '',
    type: TicketType.STORY,
  };

  const SPRINT_INITIAL_INPUT: SprintCreateInput = {
    title: '',
    goal: '',
    projectId: projectId || '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  };

  const { isOpen, toggle } = useModal();

  const { project, errorMessage, refetchProjectData } = useGetProjectData({
    projectId: projectId as string,
  });

  const toggleCallBackFn = async () => {
    setDashboardModalState('ProjectForm');
    setTicketInitialValues(TICKET_INITIAL_INPUT);
    navigate(ERoutePath.DASHBOARD.replace(':projectId', projectId as string));
  };

  const [ticketInitialValues, setTicketInitialValues] =
    useState<TicketCreateInput>(TICKET_INITIAL_INPUT);

  const [dashboardModalState, setDashboardModalState] =
    useState<DashboardModalState>('ProjectForm');

  const { notFound } = useGetTicketByParams({
    ticketId: ticketId,
    setTicketInitialValues,
    callBackFn: () => {
      if (!isOpen) {
        setDashboardModalState('TicketForm');
        toggle();
      }
    },
  });

  if (errorMessage || !project || notFound) {
    return <NotFound />;
  }

  return (
    <>
      {isOpen && dashboardModalState === 'ProjectForm' && (
        <ProjectForm
          toggle={toggle}
          refetch={refetchProjectData}
          action={EActionTypes.UPDATE}
          initialValues={project as ProjectCreateInput}
          toggleCallBackFn={toggleCallBackFn}
        />
      )}
      {isOpen && dashboardModalState === 'TicketForm' && (
        <TicketForm
          tickets={project.tickets}
          action={EActionTypes.UPDATE}
          projectName={project?.name as string}
          initialValues={ticketInitialValues}
          toggle={toggle}
          refetch={refetchProjectData}
          toggleCallBackFn={toggleCallBackFn}
          modalURL={ERoutePath.TICKET_DETAILS}
        />
      )}
      {isOpen && dashboardModalState === 'SprintForm' && (
        <SprintForm
          action={EActionTypes.UPDATE}
          projectName={project?.name as string}
          initialValues={SPRINT_INITIAL_INPUT}
          toggle={toggle}
          // refetch={refetchProjectData}
          toggleCallBackFn={toggleCallBackFn}
          modalURL={ERoutePath.DASHBOARD_SPRINT_DETAILS}
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
                  toggle();
                }}
              >
                <FaCog />
              </MainButton>
            </Col>
            <Col className='d-flex justify-content-end'>
              {
                <MainButton
                  disabled={
                    project.sprints.filter((sprint) => sprint.closed !== true)
                      .length === 0
                  }
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
              }
            </Col>
          </div>
          <DashboardContent
            project={project}
            refetch={refetchProjectData}
            toggle={toggle}
            setDashboardModalState={setDashboardModalState}
          />
        </MainContainer>
      )}
    </>
  );
};
