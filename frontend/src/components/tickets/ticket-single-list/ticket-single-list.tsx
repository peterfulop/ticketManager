import { FC } from 'react';
import { Ticket } from '../../../apollo/graphql-generated/types';
import { ERoutePath } from '../../../types/enums/routes.enum';
import { ITicket } from '../../../types/interfaces/ticket.interface';
import { TicketItem } from '../ticket-item';

interface ITicketSingleList extends ITicket {
  tickets: Ticket[];
  isStatusUpdate: boolean;
}

export const TicketSingleList: FC<ITicketSingleList> = ({
  tickets,
  isStatusUpdate,
  refetch,
}) => {
  return (
    <div className='m-2'>
      {tickets.map((ticket, key) => {
        return (
          <TicketItem
            key={key}
            ticketItem={ticket}
            isStatusUpdate={isStatusUpdate}
            refetch={refetch}
            modalURL={ERoutePath.BACKLOG_TICKET_DETAILS.replace(
              ':projectId',
              ticket.projectId
            ).replace(':ticketId', ticket.id)}
          />
        );
      })}
    </div>
  );
};
