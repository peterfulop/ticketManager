import { useEffect } from 'react';
import { TicketCreateInput } from '../../apollo/graphql-generated/types';
import { useGetTicketQuery } from '../../apollo/graphql/tickets/ticket.generated';
import { EActionTypes } from '../../types/enums/common.enum';
import { useUserErrorHandler } from '../use-user-errors-handler.hook';

interface IUseGetTicketByParams {
  ticketId?: string;
  setActionType?: React.Dispatch<React.SetStateAction<EActionTypes>>;
  setTicketInitialValues: React.Dispatch<
    React.SetStateAction<TicketCreateInput>
  >;
  callBackFn?: () => void;
}

export const useGetTicketByParams = (props: IUseGetTicketByParams) => {
  const { ticketId, setActionType, setTicketInitialValues, callBackFn } = props;
  const { notFound, errorMessage, checkErrorMessage } = useUserErrorHandler();

  const {
    data: ticketData,
    loading: getTicketLoading,
    error: getTicketError,
  } = useGetTicketQuery({
    variables: {
      projectId: '',
      id: ticketId as string,
    },
    skip: !ticketId,
  });

  useEffect(() => {
    const data = ticketData?.getTicket.ticket;
    if (ticketId) {
      if (!getTicketLoading) {
        checkErrorMessage({
          userErrors: ticketData?.getTicket.userErrors,
          graphqlError: getTicketError,
        });
        if (data) {
          setTicketInitialValues(data);
          setActionType && setActionType(EActionTypes.UPDATE);
          callBackFn && callBackFn();
        }
      }
    }
  }, [ticketData, getTicketError]);

  return { notFound, getTicketLoading, errorMessage, getTicketError };
};
