import { ApolloQueryResult } from '@apollo/client';
import { Exact, TicketCreateInput } from '../../apollo/graphql-generated/types';
import { GetProjectQuery } from '../../apollo/graphql/project/project.generated';
import { GetTicketsQuery } from '../../apollo/graphql/tickets/ticket.generated';
import { DashboardModalState } from '../../pages/dashboard';
import { IMutationProps } from './common.interface';

export interface ITicket {
  modalURL?: string;
  toggle?: () => void;
  refetch?:
    | ((
        variables?:
          | Partial<
              Exact<{
                [key: string]: never;
              }>
            >
          | undefined
      ) => Promise<ApolloQueryResult<GetTicketsQuery>>)
    | ((
        variables?:
          | Partial<
              Exact<{
                id: string;
              }>
            >
          | undefined
      ) => Promise<ApolloQueryResult<GetProjectQuery>>);
  setDashboardModalState?: React.Dispatch<
    React.SetStateAction<DashboardModalState>
  >;
}

export interface ITicketMutation extends IMutationProps {
  setTicketInitialValues: React.Dispatch<
    React.SetStateAction<TicketCreateInput>
  >;
}
