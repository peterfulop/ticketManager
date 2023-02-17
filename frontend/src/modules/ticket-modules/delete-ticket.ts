import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client';
import { Exact } from '../../apollo/graphql-generated/types';
import { TicketDeleteMutation } from '../../apollo/graphql/tickets/ticket.generated';
import { translate, translateERR } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { EServerSideError } from '../../types/enums/db-errors.enum';
import { IMutationAlerts } from '../../types/interfaces/common.interface';

interface IDeleteTicket extends IMutationAlerts {
  ticketId: string;
  deleteTicket(
    options?:
      | MutationFunctionOptions<
          TicketDeleteMutation,
          Exact<{ id: string }>,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ): Promise<FetchResult<TicketDeleteMutation>>;
}

export const deleteTicketMutation = async (props: IDeleteTicket) => {
  const {
    ticketId,
    setSuccess,
    deleteTicket,
    setAlertMessage,
    setAlertMessageColor,
  } = props;

  setAlertMessage(null);

  try {
    const res = await deleteTicket({
      variables: {
        id: ticketId,
      },
    });
    if (res.data?.ticketDelete.userErrors.length) {
      setAlertMessageColor('danger');
      const errorMessage = res.data.ticketDelete.userErrors[0].message;
      const errorValues = res.data.ticketDelete.userErrors[0].values;
      const translatedError = translateERR(errorMessage);

      if (errorMessage === EServerSideError.MISSING_FIELDS) {
        return setAlertMessage(`${translatedError}${errorValues?.toString()}`);
      }
      if (errorMessage === EServerSideError.UNIQUE_CONSTRAINT_FAIL) {
        setAlertMessage(`${translatedError}${errorValues?.toString()}`);
      } else {
        return setAlertMessage(translatedError);
      }
    }
    if (res.data?.ticketDelete.success) {
      setSuccess(true);
      setAlertMessageColor('success');
      setAlertMessage(
        translate(TEXT.forms.ticketForms.DELETE.alerts.successful)
      );
    }
  } catch (error) {
    setAlertMessage(translate(TEXT.ERRORS.SERVER_ERROR));
  }
};
