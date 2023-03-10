import { FC } from 'react';
import styled from 'styled-components';
import { Ticket, TicketStatus } from '../../../apollo/graphql-generated/types';
import { breakPoints } from '../../../assets/theme';
import { ITicket } from '../../../types/interfaces/ticket.interface';
import { ticketStatuses } from '../form/form-options';
import { TicketColumn } from './ticket-column';

const TicketColumnsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  marginTop: '2rem',
  [`@media screen and (max-width: ${breakPoints.md})`]: {
    flexDirection: 'column',
  },
});

interface ITicketColumns extends ITicket {
  tickets: Ticket[];
}

export const TicketColumns: FC<ITicketColumns> = ({
  tickets,
  toggle,
  refetch,
}) => {
  const ticketColumns = Object.entries(ticketStatuses).filter(
    (status) => status[0] !== TicketStatus.BACKLOG
  );

  return (
    <TicketColumnsContainer>
      {ticketColumns.map((status, index) => {
        return (
          <TicketColumn
            key={index}
            tickets={tickets}
            status={status[0] as TicketStatus}
            columnName={status[1].title.toUpperCase()}
            refetch={refetch}
            toggle={toggle}
          />
        );
      })}
    </TicketColumnsContainer>
  );
};
