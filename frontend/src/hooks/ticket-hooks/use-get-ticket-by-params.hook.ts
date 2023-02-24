import { useEffect } from 'react';
import { TicketCreateInput } from '../../apollo/graphql-generated/types';
import { useGetTicketQuery } from '../../apollo/graphql/tickets/ticket.generated';
import { EActionTypes } from '../../types/enums/common.enum';
import { useUserErrorsHandler } from '../use-user-errors-handler.hook';

interface IUseGetTicketByParams {
  ticketId?: string;
  setActionType: React.Dispatch<React.SetStateAction<EActionTypes>>;
  setTicketInitialValues: React.Dispatch<
    React.SetStateAction<TicketCreateInput>
  >;
  callBackFn?: () => void;
}

export const useGetTicketByParams = (props: IUseGetTicketByParams) => {
  const { ticketId, setActionType, setTicketInitialValues, callBackFn } = props;

  const { notFound, checkErrorMessage } = useUserErrorsHandler();

  const {
    data: ticketData,
    loading: getTicketLoading,
    error: getTicketError,
  } = useGetTicketQuery({
    fetchPolicy: 'no-cache',
    variables: {
      id: ticketId as string,
    },
    skip: !ticketId,
  });

  useEffect(() => {
    if (ticketId) {
      const data = ticketData?.getTicket.ticket;
      const errors = ticketData?.getTicket.userErrors;
      if (!getTicketLoading && errors && errors.length > 0) {
        checkErrorMessage(errors[0].message);
      }
      if (!getTicketLoading && data) {
        setTicketInitialValues(data);
        setActionType(EActionTypes.UPDATE);
        callBackFn && callBackFn();
      }
    }
  }, [ticketData]);

  return { notFound, getTicketError };
};
