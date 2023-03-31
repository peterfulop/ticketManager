import { useEffect } from 'react';
import {
  useTicketCreateMutation,
  useTicketDeleteMutation,
  useTicketUpdateMutation,
} from '../../apollo/graphql/tickets/ticket.generated';
import { ITicket } from '../../types/interfaces/ticket.interface';
import { useUserErrorHandler } from '../use-user-errors-handler.hook';

export const useTicketMutations = (props: ITicket) => {
  const { refetch } = props;
  const { checkErrorMessage } = useUserErrorHandler();

  const [
    createTicket,
    { loading: createLoading, data: createData, error: createDataError },
  ] = useTicketCreateMutation();
  const [
    updateTicket,
    { loading: updateLoading, data: updateData, error: updateDataError },
  ] = useTicketUpdateMutation();
  const [
    deleteTicket,
    { loading: deleteLoading, data: deleteData, error: deleteDataError },
  ] = useTicketDeleteMutation();

  const loading = createLoading || updateLoading || deleteLoading;
  const data = createData || updateData || deleteData;
  const graphqlError = createDataError || updateDataError || deleteDataError;
  const userErrors =
    createData?.ticketCreate.userErrors ||
    updateData?.ticketUpdate.userErrors ||
    deleteData?.ticketDelete.userErrors;

  useEffect(() => {
    if (!loading) {
      checkErrorMessage({ userErrors, graphqlError });
      if (data) {
        refetch && refetch();
      }
    }
  }, [data, graphqlError]);

  return {
    loading,
    createTicket,
    updateTicket,
    deleteTicket,
  };
};
