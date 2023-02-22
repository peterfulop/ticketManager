import { useEffect } from 'react';
import { TicketCreateInput } from '../../../apollo/graphql-generated/types';
import { useGetTicketQuery } from '../../../apollo/graphql/tickets/ticket.generated';
import { useUserErrorsHandler } from '../../../hooks/use-user-errors-handler.hook';
import { EActionTypes } from '../../../types/enums/common.enum';

interface IUseGetTicketData {
  ticketId: string;
  projectId: string;
  setActionType: React.Dispatch<React.SetStateAction<EActionTypes>>;
  setTicketInitialValues: React.Dispatch<
    React.SetStateAction<TicketCreateInput>
  >;
  callBackFn: () => void;
}

export const useGetTicketData = (props: IUseGetTicketData) => {
  const {
    ticketId,
    projectId,
    setActionType,
    setTicketInitialValues,
    callBackFn,
  } = props;

  const { notFound, checkErrorMessage } = useUserErrorsHandler();

  const { data: ticketData, loading: getTicketLoading } = useGetTicketQuery({
    fetchPolicy: 'no-cache',
    variables: {
      id: ticketId as string,
    },
    skip: !ticketId,
  });

  useEffect(() => {
    if (projectId) {
      const data = ticketData?.getTicket.ticket;
      const errors = ticketData?.getTicket.userErrors;
      if (!getTicketLoading && errors && errors.length > 0) {
        checkErrorMessage(errors[0].message);
      }
      if (!getTicketLoading && data) {
        setTicketInitialValues(data);
        setActionType(EActionTypes.UPDATE);
        callBackFn();
      }
    }
  }, [ticketData]);

  return { notFound };
};
