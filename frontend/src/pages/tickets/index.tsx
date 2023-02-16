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
import { useGetMyTicketsQuery } from '../../apollo/graphql/tickets/ticket.generated';
import { MainButton } from '../../components/component-library/main-button/main-button';
import { MainContainer } from '../../components/main-content/main-content';
import { TicketForm } from '../../components/tickets/forms/ticket-form';
import { TicketColumns } from '../../components/tickets/ticket-columns';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useModal } from '../../hooks/use-modal.hook';
import { EActionTypes } from '../../types/enums/common.enum';
import { ERoutePath } from '../../types/enums/routes.enum';

export const TicketsPage = () => {
  const { projectId } = useParams();

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

  const [tickets, setTickets] = useState<Ticket[]>([]);

  const { data, loading, refetch } = useGetMyTicketsQuery({
    fetchPolicy: 'no-cache',
    variables: {
      input: {
        projectId,
      },
    },
    skip: !projectId,
  });

  const { data: projectData } = useGetMyProjectQuery({
    variables: {
      id: projectId as string,
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (data?.getMyTickets.tickets) {
      setTickets(data?.getMyTickets.tickets as Ticket[]);
    }
  }, [data]);

  return (
    <>
      {isOpen && actionType !== EActionTypes.READ && (
        <TicketForm
          toggle={toggle}
          refetch={refetch}
          action={actionType}
          initialValues={ticketInitialValues}
        />
      )}
      <MainContainer style={{ display: 'block', padding: '2rem 1rem' }}>
        <h3 className='mb-3'>{projectData?.getMyProject.project?.name}</h3>
        <div className='d-flex justify-content-start gap-2'>
          <MainButton
            label='back'
            handleClick={() => navigate(ERoutePath.PROJECTS)}
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
        {loading && <p>{translate(TEXT.general.loading)}</p>}
        <TicketColumns tickets={tickets as Ticket[]} refetch={refetch} />
      </MainContainer>
    </>
  );
};
