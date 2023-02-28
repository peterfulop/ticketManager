import { useEffect, useState } from 'react';
import { Ticket } from '../../apollo/graphql-generated/types';
import { useGetTicketsQuery } from '../../apollo/graphql/tickets/ticket.generated';
import { useUserErrorHandler } from '../use-user-errors-handler.hook';

interface IUseGetSprints {
  projectId: string;
}

export const useGetSprints = (props: IUseGetSprints) => {
  const { projectId } = props;
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { checkErrorMessage } = useUserErrorHandler();

  const {
    data: myTickets,
    loading: getTicketsLoading,
    error: getTicketsError,
    refetch: refetchMyTickets,
  } = useGetTicketsQuery({
    variables: {
      projectId: projectId,
      input: {
        projectId,
      },
    },
    skip: !projectId,
  });

  useEffect(() => {
    const data = myTickets?.getTickets.tickets;
    if (!getTicketsLoading) {
      checkErrorMessage({
        userErrors: myTickets?.getTickets.userErrors,
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
