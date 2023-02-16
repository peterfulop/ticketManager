import { ApolloQueryResult } from '@apollo/client';
import { FC } from 'react';
import styled from 'styled-components';
import {
  Exact,
  Ticket,
  TicketStatus,
} from '../../apollo/graphql-generated/types';
import { GetMyTicketsQuery } from '../../apollo/graphql/tickets/ticket.generated';
import { breakPoints } from '../../assets/theme';
import { ticketStatuses } from '../../helpers/ticket-statuses';
import { TicketColumn } from './ticket-column';

const TicketColumnsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  marginTop: '2rem',
  [`@media screen and (max-width: ${breakPoints.lg})`]: {
    flexDirection: 'column',
  },
});

interface ITicketColumns {
  tickets: Ticket[];
  refetch: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetMyTicketsQuery>>;
}

export const TicketColumns: FC<ITicketColumns> = ({ tickets, refetch }) => {
  return (
    <TicketColumnsContainer>
      {Object.entries(ticketStatuses).map((status, index) => {
        return (
          <TicketColumn
            key={index}
            tickets={tickets}
            status={status[0] as TicketStatus}
            columnName={status[1].title.toUpperCase()}
            refetch={refetch}
          />
        );
      })}
    </TicketColumnsContainer>
  );
};
