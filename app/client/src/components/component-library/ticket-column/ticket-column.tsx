import { Ticket, TicketStatus } from '../../../apollo/graphql-generated/types';
import { TicketItem } from '../ticket-item/ticket-item';
import './TicketColumn.css';

export const TicketColumn = (props: {
  tickets: Ticket[];
  columnName: string;
  status: TicketStatus;
  currentPath: string;
}): JSX.Element => {
  return (
    <div className="tickets-section__column">
      <p className="header">{props.columnName}</p>
      <div className="ticket-section__items">
        {props.tickets.map((ticket, index) => {
          return (
            ticket.status === props.status && (
              <TicketItem
                key={index}
                ticketItem={ticket}
                currentPath={props.currentPath}
              />
            )
          );
        })}
      </div>
    </div>
  );
};
