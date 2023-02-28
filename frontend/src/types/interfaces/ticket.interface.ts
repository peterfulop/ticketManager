import { ApolloQueryResult } from '@apollo/client';
import { Exact, TicketCreateInput } from '../../apollo/graphql-generated/types';
import { GetTicketsQuery } from '../../apollo/graphql/tickets/ticket.generated';
import { IMutationProps } from './common.interface';

export interface ITicket {
  modalURL?: string;
  toggle?: () => void;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetTicketsQuery>>;
}

export interface ITicketMutation extends IMutationProps {
  setTicketInitialValues: React.Dispatch<
    React.SetStateAction<TicketCreateInput>
  >;
}
