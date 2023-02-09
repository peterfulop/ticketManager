import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Ticket,
  TicketCreateInput,
  TicketPriority,
  TicketStatus,
  TicketType,
} from '../../apollo/graphql-generated/types';
import { useGetMyProjectQuery } from '../../apollo/graphql/project/project.generated';
import { useGetMyTicketsQuery } from '../../apollo/graphql/tickets/ticket.generated';
import { CreateNewButton } from '../../components/create-new-button/create-new-button';
import { MainContainer } from '../../components/main-content/main-content';
import { TicketForm } from '../../components/tickets/forms/ticket-form';
import { TicketColumns } from '../../components/tickets/ticket-columns';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useModal } from '../../hooks/use-modal.hook';
import { EActionTypes } from '../../types/enums/common.enum';

export const TicketsPage = () => {
  const { projectId } = useParams();

  const TICKET_INITIAL_INPUT: TicketCreateInput = {
    comment: '',
    description: '',
    priority: TicketPriority.Medium,
    projectId: projectId || '',
    references: [],
    status: TicketStatus.ToDo,
    storyPoints: 1,
    title: '',
    type: TicketType.Story,
  };

  const { isOpen, toggle } = useModal();
  const [selectedId, setSelectedId] = useState<string>('');

  const [actionType, setActionType] = useState<EActionTypes>(
    EActionTypes.CREATE
  );
  const [ticketInitialValues, setTicketInitialValues] =
    useState<TicketCreateInput>(TICKET_INITIAL_INPUT);

  const [tickets, setTickets] = useState<Ticket[]>([]);

  const { data, loading, refetch } = useGetMyTicketsQuery({
    fetchPolicy: 'no-cache',
  });

  const { data: projectData } = useGetMyProjectQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (data?.getMyTickets.tickets) {
      setTickets(data?.getMyTickets.tickets as Ticket[]);
    }
  }, [data]);

  const currentPATH = window.location.pathname;
  const projectName = projectData?.getMyProject.project?.name as string;

  return (
    <>
      {isOpen && actionType !== EActionTypes.READ && (
        <TicketForm
          toggle={toggle}
          refetch={refetch}
          action={actionType}
          selectedId={selectedId}
          initialValues={ticketInitialValues}
        />
      )}
      <MainContainer style={{ display: 'block', padding: '2rem 1rem' }}>
        <CreateNewButton
          label={translate(TEXT.forms.ticketForms.CREATE.buttons.submitBtn)}
          toggle={toggle}
          handleClick={() => {
            setActionType(EActionTypes.CREATE);
            setTicketInitialValues(TICKET_INITIAL_INPUT);
          }}
        />
        {loading && <p>loading...</p>}
        <TicketColumns
          tickets={tickets as Ticket[]}
          currentPath={currentPATH}
          projectName={projectName}
        />
      </MainContainer>
    </>
  );
};
