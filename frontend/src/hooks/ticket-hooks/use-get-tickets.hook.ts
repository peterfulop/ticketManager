import { useEffect, useState } from 'react';
import { Ticket } from '../../apollo/graphql-generated/types';
import { useGetMyTicketsQuery } from '../../apollo/graphql/tickets/ticket.generated';
import { useUserErrorsHandler } from '../use-user-errors-handler.hook';

interface IUseGetTickets {
  projectId: string;
}

export const useGetTickets = (props: IUseGetTickets) => {
  const { projectId } = props;
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { checkErrorMessage } = useUserErrorsHandler();

  const {
    data: myTickets,
    loading: getTicketsLoading,
    error: getTicketsError,
    refetch: refetchMyTickets,
  } = useGetMyTicketsQuery({
    fetchPolicy: 'no-cache',
    variables: {
      input: {
        projectId,
      },
    },
    skip: !projectId,
  });

  useEffect(() => {
    const data = myTickets?.getMyTickets.tickets;
    const errors = myTickets?.getMyTickets.userErrors;
    if (!getTicketsLoading && errors && errors.length > 0) {
      checkErrorMessage(errors[0].message);
    }
    if (!getTicketsLoading && data) {
      setTickets(data as Ticket[]);
    }
  }, [myTickets]);

  return {
    tickets,
    getTicketsLoading,
    getTicketsError,
    refetchMyTickets,
  };
};
