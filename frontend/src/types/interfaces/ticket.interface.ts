import { ApolloQueryResult } from '@apollo/client';
import { Exact } from '../../apollo/graphql-generated/types';
import { GetMyTicketsQuery } from '../../apollo/graphql/tickets/ticket.generated';

export interface ITicket {
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
