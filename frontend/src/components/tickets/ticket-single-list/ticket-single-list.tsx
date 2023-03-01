import { FC } from 'react';
import styled from 'styled-components';
import { Ticket } from '../../../apollo/graphql-generated/types';
import { ITicket } from '../../../types/interfaces/ticket.interface';
import { TicketItem } from '../ticket-item';

const SingleList = styled.div({
  maxHeight: '630px',
  overflow: 'auto',
  margin: '.75rem',
});

interface ITicketSingleList extends ITicket {
  tickets: Ticket[];
  isStatusUpdate: boolean;
  style?: React.CSSProperties;
}

export const TicketSingleList: FC<ITicketSingleList> = ({
  tickets,
  isStatusUpdate,
  style,
  modalURL,
  refetch,
  setDashboardModalState,
}) => {
  return (
    <SingleList style={style}>
      {tickets.length ? (
        tickets.map((ticket, key) => {
          return (
            <TicketItem
              key={key}
              ticketItem={ticket}
              isStatusUpdate={isStatusUpdate}
              refetch={refetch}
              setDashboardModalState={setDashboardModalState}
              modalURL={
                modalURL
                  ? modalURL
                      .replace(':projectId', ticket.projectId)
                      .replace(':ticketId', ticket.id)
                  : ''
              }
            />
          );
        })
      ) : (
        <p>{'No tickets yet...'}</p>
      )}
    </SingleList>
  );
};
