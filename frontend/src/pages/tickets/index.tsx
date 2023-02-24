import { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TicketCreateInput,
  TicketPriority,
  TicketStatus,
  TicketType,
} from '../../apollo/graphql-generated/types';
import { MainButton } from '../../components/component-library/main-button/main-button';
import { MainContainer } from '../../components/main-content/main-content';
import { TicketForm } from '../../components/tickets/form/ticket-form';
import { TicketColumns } from '../../components/tickets/ticket-columns';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useGetProjectData } from '../../hooks/ticket-hooks/use-get-project-data.hook';
import { useGetTicketByParams } from '../../hooks/ticket-hooks/use-get-ticket-by-params.hook';
import { useGetTickets } from '../../hooks/ticket-hooks/use-get-tickets.hook';
import { useModal } from '../../hooks/use-modal.hook';
import { EActionTypes } from '../../types/enums/common.enum';
import { ERoutePath } from '../../types/enums/routes.enum';
import { NotFound } from '../404';

export const TicketsPage = () => {
  const { projectId, ticketId } = useParams();

  const TICKET_INITIAL_INPUT: TicketCreateInput = {
    comment: '',
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
  const [ticketInitialValues, setTicketInitialValues] =
    useState<TicketCreateInput>(TICKET_INITIAL_INPUT);

  const toggleCallBackFn = () => {
    setActionType(EActionTypes.CREATE);
    setTicketInitialValues(TICKET_INITIAL_INPUT);
    navigate(ERoutePath.TICKETS.replace(':projectId', projectId as string));
  };

  const { projectName } = useGetProjectData({ projectId: projectId as string });

  const { tickets, getTicketsLoading, refetchMyTickets } = useGetTickets({
    projectId: projectId as string,
  });

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
          projectName={projectName}
          initialValues={ticketInitialValues}
          toggle={toggle}
          refetchMyTickets={refetchMyTickets}
          toggleCallBackFn={toggleCallBackFn}
        />
      )}
      <MainContainer style={{ display: 'block', padding: '2rem 1rem' }}>
        <h3 className='mb-3'>{projectName}</h3>
        <div className='d-flex justify-content-start gap-2'>
          <MainButton
            label='back'
            handleClick={() => {
              navigate(ERoutePath.PROJECTS);
            }}
          >
            <MdOutlineArrowBackIos />
          </MainButton>
          <MainButton
            label={translate(TEXT.forms.ticketForms.CREATE.buttons.submitBtn)}
            toggle={toggle}
            handleClick={() => {
              setActionType(EActionTypes.CREATE);
              setTicketInitialValues(TICKET_INITIAL_INPUT);
            }}
          >
            <GrAdd />
          </MainButton>
        </div>
        {getTicketsLoading && <p>{translate(TEXT.general.loading)}</p>}
        <TicketColumns
          tickets={tickets}
          refetchMyTickets={refetchMyTickets}
          toggle={toggle}
        />
      </MainContainer>
    </>
  );
};
