import {
  ApolloQueryResult,
  QueryHookOptions,
  QueryResult,
} from '@apollo/client';
import { Exact, TicketCreateInput } from '../../apollo/graphql-generated/types';
import {
  GetMyTicketsQuery,
  GetTicketQuery,
} from '../../apollo/graphql/tickets/ticket.generated';
import { IMutationProps } from './common.interface';

export interface ITicket {
  toggle?: () => void;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetMyTicketsQuery>>;
  getTicket?: (
    baseOptions: QueryHookOptions<
      GetTicketQuery,
      Exact<{
        id: string;
      }>
    >
  ) => QueryResult<
    GetTicketQuery,
    Exact<{
      id: string;
    }>
  >;
}

export interface ITicketMutation extends IMutationProps {
  setTicketInitialValues: React.Dispatch<
    React.SetStateAction<TicketCreateInput>
  >;
}
