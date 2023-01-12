import { useNavigate } from 'react-router';
import { Ticket } from '../../../apollo/graphql-generated/types';
import { PriorityIcon } from '../priority-icon/priority-icon';
import { TicketTypeIcon } from '../ticket-type-icons/ticket-type-icons';
import './TicketItem.css';

export const TicketItem = (props: {
  ticketItem: Ticket;
  currentPath: string;
}): JSX.Element => {
  const { id, title, priority, type, storyPoints, createdAt } =
    props.ticketItem;
  const { currentPath } = props;
  const ticketHref = `${currentPath}/${id}`;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ticketHref);
  };

  return (
    <div className="ticket-item" key={id} id={id} onClick={handleClick}>
      <p>{title}</p>
      <div className="ticket-item-footer">
        <div className="ticket-item-footer__left">
          {<PriorityIcon priority={priority} size={20} />}
          {<TicketTypeIcon type={type} size={20} />}
          <p className="story-points-window">{storyPoints}</p>
        </div>
        <p>{createdAt && new Date(createdAt).toDateString()}</p>
      </div>
    </div>
  );
};
