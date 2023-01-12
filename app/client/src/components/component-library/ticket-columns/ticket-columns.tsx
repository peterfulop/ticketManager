import { Ticket, TicketStatus } from '../../../apollo/graphql-generated/types';
import { ticketStatusObjects } from '../../../helpers/ticket-status-settings';
import { TicketColumn } from '../ticket-column/ticket-column';

import './TicketColumns.css';

export const TicketColumns = (props: {
  tickets: Ticket[];
  currentPath: string;
  projectName: string;
}) => {
  return (
    <div className="tickets-section__columns">
      {Object.entries(ticketStatusObjects).map((status, index) => {
        return (
          <TicketColumn
            key={index}
            tickets={props.tickets}
            currentPath={props.currentPath}
            status={status[0] as TicketStatus}
            columnName={status[1].title.toUpperCase()}
            projectName={props.projectName}
          />
        );
      })}
    </div>
  );
};
