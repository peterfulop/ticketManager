import { useNavigate } from 'react-router';
import { Ticket } from '../../../apollo/graphql-generated/types';
import { PriorityIcon } from '../priority-arrows/priority-icons';
import './TicketItem.css';

export const TicketItem = (props: {
  ticketItem: Ticket;
  currentPath: string;
}): JSX.Element => {
  const { id, title, priority, createdAt } = props.ticketItem;
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
        {/* {ticketPriorityObjects[priority].icon} */}
        {<PriorityIcon priority={priority} />}
        <p>{createdAt && new Date(createdAt).toDateString()}</p>
      </div>
    </div>
  );
};
