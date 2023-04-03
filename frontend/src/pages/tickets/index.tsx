import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import { GrRun } from 'react-icons/gr';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TicketCreateInput,
  TicketPriority,
  TicketStatus,
  TicketType,
} from '../../apollo/graphql-generated/types';
import { MainButton } from '../../components/component-library/main-button/main-button';
import { MainSelect } from '../../components/component-library/main-select/main-select';
import { MainContainer } from '../../components/main-content/main-content';
import { ticketStatuses } from '../../components/tickets/form/form-options';
import { TicketForm } from '../../components/tickets/form/ticket-form';
import { TicketColumns } from '../../components/tickets/ticket-list/ticket-columns';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useGetProjectData } from '../../hooks/project-hooks/use-get-project-data.hook';
import { useGetTicketByParams } from '../../hooks/ticket-hooks/use-get-ticket-by-params.hook';
import { useGetTickets } from '../../hooks/ticket-hooks/use-get-tickets.hook';
import { useModal } from '../../hooks/use-modal.hook';
import { EActionTypes } from '../../types/enums/common.enum';
import { RoutePath } from '../../types/enums/routes.enum';
import { setSelectOptions } from '../../utils/set-select-options';
import { NotFound } from '../404';

export const TicketsPage = () => {
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

  const navigate = useNavigate();
  const { isOpen, toggle } = useModal();
  const [actionType, setActionType] = useState<EActionTypes>(
    EActionTypes.CREATE
  );

  const [isActiveSprint, setIsActiveSprint] = useState<boolean>(false);

  const [ticketInitialValues, setTicketInitialValues] =
    useState<TicketCreateInput>(TICKET_INITIAL_INPUT);

  const toggleCallBackFn = () => {
    setActionType(EActionTypes.CREATE);
    setTicketInitialValues(TICKET_INITIAL_INPUT);
    navigate(RoutePath.TICKETS.replace(':projectId', projectId as string));
  };

  const { project, getProjectLoading } = useGetProjectData({
    projectId: projectId as string,
  });

  const { tickets, getTicketsLoading, refetchMyTickets } = useGetTickets({
    projectId: projectId as string,
  });

  useEffect(() => {
    if (project) {
      const activeSprints = project?.sprints.filter((sprint) => !sprint.closed);
      if (activeSprints?.length) {
        setIsActiveSprint(true);
      } else {
        setIsActiveSprint(false);
      }
    }
  }, [project]);

  const { notFound } = useGetTicketByParams({
    ticketId: ticketId,
    setActionType,
    setTicketInitialValues,
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
        <TicketForm
          tickets={tickets}
          action={actionType}
          projectName={project?.name as string}
          initialValues={ticketInitialValues}
          toggle={toggle}
          refetch={refetchMyTickets}
          toggleCallBackFn={toggleCallBackFn}
          modalURL={RoutePath.TICKET_DETAILS}
        />
      )}
      {!getProjectLoading && !getTicketsLoading && (
        <MainContainer style={{ display: 'block', padding: '2rem 1rem' }}>
          <h3 className='mb-3'>{project?.name} - active tickets</h3>
          <div className='d-flex justify-content-between gap-2'>
            <Col className='d-flex gap-3'>
              <MainButton
                label='back'
                handleClick={() => {
                  navigate(
                    RoutePath.DASHBOARD.replace(
                      ':projectId',
                      projectId as string
                    )
                  );
                }}
              >
                <MdOutlineArrowBackIos />
              </MainButton>
              {isActiveSprint && (
                <MainButton
                  label={translate(
                    TEXT.forms.ticketForms.CREATE.buttons.submitBtn
                  )}
                  handleClick={() => {
                    toggle();
                    setActionType(EActionTypes.CREATE);
                    setTicketInitialValues(TICKET_INITIAL_INPUT);
                  }}
                >
                  <FiPlus size={20} />
                </MainButton>
              )}
            </Col>
            <Col className='d-flex gap-3 justify-content-end'>
              {isActiveSprint && (
                <MainSelect
                  options={setSelectOptions(ticketStatuses)}
                  style={{ width: 'auto' }}
                >
                  <GrRun size={22} />
                </MainSelect>
              )}
            </Col>
          </div>
          {getTicketsLoading && <p>{translate(TEXT.general.loading)}</p>}
          {isActiveSprint ? (
            <TicketColumns
              tickets={tickets}
              refetch={refetchMyTickets}
              toggle={toggle}
            />
          ) : (
            <div className='mt-3'>
              <h5>{translate(TEXT.pages.tickets.labels.noActiveSprint)}</h5>
            </div>
          )}
        </MainContainer>
      )}
    </>
  );
};
