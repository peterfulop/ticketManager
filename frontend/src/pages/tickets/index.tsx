import { useEffect, useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Ticket,
  TicketCreateInput,
  TicketPriority,
  TicketStatus,
  TicketType,
} from '../../apollo/graphql-generated/types';
import { useGetMyProjectQuery } from '../../apollo/graphql/project/project.generated';
import {
  useGetMyTicketsQuery,
  useGetTicketQuery,
} from '../../apollo/graphql/tickets/ticket.generated';
import { MainButton } from '../../components/component-library/main-button/main-button';
import { MainContainer } from '../../components/main-content/main-content';
import { TicketForm } from '../../components/tickets/forms/ticket-form';
import { TicketColumns } from '../../components/tickets/ticket-columns';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useModal } from '../../hooks/use-modal.hook';
import { ERoutePath } from '../../types/enums/routes.enum';

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
  // const [actionType, setActionType] = useState<MutationTypes>(
  //   EActionTypes.CREATE
  // );

  const [ticketInitialValues, setTicketInitialValues] =
    useState<TicketCreateInput>(TICKET_INITIAL_INPUT);

  const [tickets, setTickets] = useState<Ticket[]>([]);

  const {
    data: myTickets,
    loading,
    refetch: refetchMyTickets,
  } = useGetMyTicketsQuery({
    fetchPolicy: 'no-cache',
    variables: {
      input: {
        projectId,
      },
    },
    skip: !projectId,
  });

  const { data: projectData } = useGetMyProjectQuery({
    fetchPolicy: 'no-cache',
    variables: {
      id: projectId as string,
    },
  });

  const { data: ticketData } = useGetTicketQuery({
    fetchPolicy: 'no-cache',
    variables: {
      id: ticketId as string,
    },
    skip: !ticketId,
  });

  const toggleCallBackFn = () => {
    // setActionType(EActionTypes.CREATE);
    setTicketInitialValues(TICKET_INITIAL_INPUT);
    navigate(ERoutePath.TICKETS.replace(':projectId', projectId as string));
  };

  useEffect(() => {
    if (myTickets?.getMyTickets.tickets) {
      setTickets(myTickets?.getMyTickets.tickets as Ticket[]);
    }
  }, [myTickets?.getMyTickets.tickets]);

  useEffect(() => {
    if (ticketId) {
      if (ticketData?.getTicket.ticket) {
        // setActionType(EActionTypes.UPDATE);
        setTicketInitialValues(ticketData.getTicket.ticket);
        if (!isOpen) {
          toggle();
        }
      }
    }
  }, [ticketData?.getTicket.ticket]);

  const projectName = projectData?.getMyProject.project?.name as string;

  return (
    <>
      {isOpen && (
        <TicketForm
          tickets={tickets}
          // action={actionType}
          projectName={projectName}
          initialValues={ticketInitialValues}
          refetchMyTickets={refetchMyTickets}
          toggle={toggle}
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
              // setActionType(EActionTypes.CREATE);
              setTicketInitialValues(TICKET_INITIAL_INPUT);
            }}
          >
            <GrAdd />
          </MainButton>
        </div>
        {loading && <p>{translate(TEXT.general.loading)}</p>}
        <TicketColumns
          tickets={tickets}
          refetchMyTickets={refetchMyTickets}
          toggle={toggle}
        />
      </MainContainer>
    </>
  );
};
