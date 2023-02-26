import { FC } from 'react';
import styled from 'styled-components';
import { Ticket, TicketStatus } from '../../../apollo/graphql-generated/types';
import { ERoutePath } from '../../../types/enums/routes.enum';
import { ITicket } from '../../../types/interfaces/ticket.interface';
import { TicketItem } from '../ticket-item';

const TicketBackups = styled.div({
  marginTop: '2rem',
  h4: {
    backgroundColor: '#ced0d3',
    textAlign: 'center',
    padding: '10px 0px',
  },
});

const TicketBackupList = styled.div({
  maxHeight: '500px',
  overflow: 'auto',
  backgroundColor: '#f4f5f7',
});

interface ITicketBacklogList extends ITicket {
  tickets: Ticket[];
}

export const TicketBacklogList: FC<ITicketBacklogList> = ({
  tickets,
  refetch,
}) => {
  const ticketColumns = tickets.filter(
    (ticket) => ticket.status === TicketStatus.BACKLOG
  );
  return (
    <TicketBackups>
      <h4>Backlog</h4>
      <TicketBackupList>
        {ticketColumns.map((ticket, key) => {
          return (
            <TicketItem
              key={key}
              ticketItem={ticket}
              refetch={refetch}
              modalURL={ERoutePath.BACKLOG_TICKET_DETAILS.replace(
                ':projectId',
                ticket.projectId
              ).replace(':ticketId', ticket.id)}
            />
          );
        })}
      </TicketBackupList>
    </TicketBackups>
  );
};
