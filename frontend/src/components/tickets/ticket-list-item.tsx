import { FC } from 'react';
import styled from 'styled-components';
import { Ticket } from '../../apollo/graphql-generated/types';
import { PriorityIcon } from '../component-library/icons/priority-icon';
import { TicketTypeIcon } from '../component-library/icons/ticket-type-icon';
import { TicketStatusSelect } from '../ticket-status-select/ticket-status-select';

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
  overflow: 'hidden',
  p: {
    margin: '0 10px 10px 0',
  },
  select: {
    display: 'none',
  },
});

const TicketItemContent = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '1rem',
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

interface ITicketItem {
  ticketItem: Ticket;
  currentPath: string;
  projectName: string;
}

export const TicketListItem: FC<ITicketItem> = ({
  ticketItem,
  currentPath,
  projectName,
}) => {
  const { id, title, status, priority, type, storyPoints, sequenceId } =
    ticketItem;

  // const ticketHref = `${currentPath}/${id}`;
  // const navigate = useNavigate();

  const handleClick = () => {
    // navigate(ticketHref);
  };

  return (
    <TicketItem key={id} id={id} onClick={handleClick}>
      <TicketItemHeading>
        <p title={title}>{title}</p>
        <TicketStatusSelect id={id} currentStatus={status} />
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
