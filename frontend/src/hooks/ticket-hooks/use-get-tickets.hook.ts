import { useEffect, useState } from 'react';
import { Ticket } from '../../apollo/graphql-generated/types';
import { useGetMyTicketsQuery } from '../../apollo/graphql/tickets/ticket.generated';
import { useUserErrorHandler } from '../use-user-errors-handler.hook';

interface IUseGetTickets {
  projectId: string;
}

export const useGetTickets = (props: IUseGetTickets) => {
  const { projectId } = props;
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { checkErrorMessage } = useUserErrorHandler();

  const {
    data: myTickets,
    loading: getTicketsLoading,
    error: getTicketsError,
    refetch: refetchMyTickets,
  } = useGetMyTicketsQuery({
    variables: {
      input: {
        projectId,
      },
    },
    skip: !projectId,
  });

  useEffect(() => {
    const data = myTickets?.getMyTickets.tickets;
    if (!getTicketsLoading) {
      checkErrorMessage({
        userErrors: myTickets?.getMyTickets.userErrors,
        graphqlError: getTicketsError,
      });
    }
    if (!getTicketsLoading && data) {
      setTickets(data as Ticket[]);
    }
  }, [myTickets, getTicketsError]);

  return {
    tickets,
    getTicketsLoading,
    getTicketsError,
    refetchMyTickets,
  };
};
