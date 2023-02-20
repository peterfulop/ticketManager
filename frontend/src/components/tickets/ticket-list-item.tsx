import { FC } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { Ticket, TicketStatus } from '../../apollo/graphql-generated/types';
import { useTicketStatusUpdateMutation } from '../../apollo/graphql/tickets/ticket.generated';
import { breakPoints } from '../../assets/theme';
import { ticketStatuses } from '../../helpers/ticket-statuses';
import { MainSelectOption } from '../../types';
import { ERoutePath } from '../../types/enums/routes.enum';
import { ITicket } from '../../types/interfaces/ticket.interface';
import { PriorityIcon } from '../component-library/icons/priority-icon';
import { TicketTypeIcon } from '../component-library/icons/ticket-type-icon';
import { MainSelect } from '../component-library/main-select/main-select';

const TicketItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  justifyItems: 'center',
  alignItems: 'flex-start',
  padding: '10px',
  backgroundColor: 'rgb(255, 255, 255)',
  borderRadius: '5px',
  margin: '0.25rem 0.5rem',
  boxShadow: '0 1px 2px 0 rgba(9, 30, 66, 0.25)',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: 'rgb(227, 236, 242)',
  },
  ':hover select': {
    display: 'block',
  },
});

const TicketItemHeading = styled.div({
  width: '100%',
  display: 'flex',
  height: '50px',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '5px',
  overflow: 'hidden',
  p: {
    margin: '0 10px 10px 0',
  },
  select: {
    display: 'none',
    width: '135px',
    textTransform: 'lowercase',
  },
  [`@media screen and (max-width: ${breakPoints.xl})`]: {
    display: 'block',
    height: '80px',
  },
});

const TicketItemContent = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '1rem',
  padding: '5px',
  '.ticket-item-footer__left': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  '.story-points-window': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '13px',
    backgroundColor: 'rgb(225, 225, 225)',
    width: '25px',
    height: '25px',
    borderRadius: '12.5px',
  },
});

interface ITicketItem extends ITicket {
  ticketItem: Ticket;
  ticketId: string;
}

export const TicketListItem: FC<ITicketItem> = ({
  ticketItem,
  refetchMyTickets,
}) => {
  const { id, title, status, priority, type, storyPoints, sequenceId } =
    ticketItem;

  const navigate = useNavigate();
  const { projectId } = useParams();
  const [updateStatus] = useTicketStatusUpdateMutation();

  const ticketStatusOptions: MainSelectOption[] = Object.entries(
    ticketStatuses
  ).map((obj) => {
    const status = obj[0];
    const values = obj[1];
    return {
      value: status,
      content: values.title,
    };
  });

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await updateStatus({
      variables: {
        input: {
          ticketId: id,
          status: e.target.value as TicketStatus,
        },
      },
    });
    await refetchMyTickets();
  };

  const handleClick = () => {
    navigate(
      ERoutePath.TICKET_DETAILS.replace(
        ':projectId',
        projectId as string
      ).replace(':ticketId', id)
    );
  };

  return (
    <TicketItem key={id} onClick={handleClick}>
      <TicketItemHeading>
        <p title={title}>{title}</p>
        <MainSelect
          id={id}
          name='ticket-status'
          value={status}
          options={ticketStatusOptions}
          onChange={handleChange}
        />
      </TicketItemHeading>
      <TicketItemContent>
        <div className='ticket-item-footer__left'>
          <PriorityIcon priority={priority} size={20} />
          <TicketTypeIcon type={type} size={20} />
          <p className='story-points-window'>{storyPoints}</p>
        </div>
        <small>{sequenceId}</small>
      </TicketItemContent>
    </TicketItem>
  );
};
