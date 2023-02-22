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
import { TicketForm } from '../../components/tickets/form/ticket-form';
import { TicketColumns } from '../../components/tickets/ticket-columns';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useUserAuthentication } from '../../hooks/use-logging-out-user.hook';
import { useModal } from '../../hooks/use-modal.hook';
import { EActionTypes } from '../../types/enums/common.enum';
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
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [actionType, setActionType] = useState<EActionTypes>(
    EActionTypes.CREATE
  );
  const [ticketInitialValues, setTicketInitialValues] =
    useState<TicketCreateInput>(TICKET_INITIAL_INPUT);

  const { checkErrorMessage } = useUserAuthentication();

  const {
    data: myTickets,
    loading: getTicketsLoading,
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

  const { data: projectData, loading: getProjectLoading } =
    useGetMyProjectQuery({
      fetchPolicy: 'no-cache',
      variables: {
        id: projectId as string,
      },
    });

  const { data: ticketData, loading: getTicketLoading } = useGetTicketQuery({
    fetchPolicy: 'no-cache',
    variables: {
      id: ticketId as string,
    },
    skip: !ticketId,
  });

  const toggleCallBackFn = () => {
    setActionType(EActionTypes.CREATE);
    setTicketInitialValues(TICKET_INITIAL_INPUT);
    navigate(ERoutePath.TICKETS.replace(':projectId', projectId as string));
  };

  useEffect(() => {
    const data = projectData?.getMyProject.project;
    const errors = projectData?.getMyProject.userErrors;
    if (!getProjectLoading && errors && errors.length > 0) {
      checkErrorMessage(errors[0].message);
    }
    if (!getProjectLoading && data) {
      setProjectName(data.name);
    }
  }, [projectData?.getMyProject.project]);

  useEffect(() => {
    const data = myTickets?.getMyTickets.tickets;
    const errors = myTickets?.getMyTickets.userErrors;
    if (!getTicketsLoading && errors && errors.length > 0) {
      checkErrorMessage(errors[0].message);
    }
    if (!getTicketsLoading && data) {
      setTickets(data as Ticket[]);
    }
  }, [myTickets?.getMyTickets.tickets]);

  useEffect(() => {
    if (projectId) {
      const data = ticketData?.getTicket.ticket;
      const errors = ticketData?.getTicket.userErrors;
      if (!getTicketLoading && errors && errors.length > 0) {
        checkErrorMessage(errors[0].message);
      }
      if (!getTicketLoading && data) {
        setTicketInitialValues(data);
        setActionType(EActionTypes.UPDATE);
        if (!isOpen) {
          toggle();
        }
      }
    }
  }, [ticketData?.getTicket.ticket]);

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
