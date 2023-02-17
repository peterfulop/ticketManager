import { ApolloQueryResult } from '@apollo/client';
import { Exact, TicketCreateInput } from '../../apollo/graphql-generated/types';
import { GetMyTicketsQuery } from '../../apollo/graphql/tickets/ticket.generated';
import { IMutationProps } from './common.interface';

export interface ITicket {
  toggle?: () => void;
  refetchMyTickets: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetMyTicketsQuery>>;
}

export interface ITicketMutation extends IMutationProps {
  setTicketInitialValues: React.Dispatch<
    React.SetStateAction<TicketCreateInput>
  >;
}
