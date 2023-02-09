import { FC } from 'react';
import styled from 'styled-components';
import { Ticket, TicketStatus } from '../../apollo/graphql-generated/types';
import { ticketStatusObjects } from '../../helpers/ticket-status-settings';
import { TicketColumn } from './ticket-column';

const TicketColumnsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  marginTop: '2rem',
});

interface ITicketColumns {
  tickets: Ticket[];
  currentPath: string;
  projectName: string;
}

export const TicketColumns: FC<ITicketColumns> = ({
  tickets,
  currentPath,
  projectName,
}) => {
  return (
    <TicketColumnsContainer>
      {Object.entries(ticketStatusObjects).map((status, index) => {
        return (
          <TicketColumn
            key={index}
            tickets={tickets}
            currentPath={currentPath}
            status={status[0] as TicketStatus}
            columnName={status[1].title.toUpperCase()}
            projectName={projectName}
          />
        );
      })}
    </TicketColumnsContainer>
  );
};
