import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client';
import { Exact, TicketUpdateInput } from '../../apollo/graphql-generated/types';
import { TicketUpdateMutation } from '../../apollo/graphql/tickets/ticket.generated';
import { translate, translateERR } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { ServerSideError } from '../../types/enums/db-errors.enum';
import { IMutationAlerts } from '../../types/interfaces/common.interface';

interface IUpdateTicket extends IMutationAlerts {
  values: TicketUpdateInput;
  ticketId: string;
  updateTicket(
    options?:
      | MutationFunctionOptions<
          TicketUpdateMutation,
          Exact<{ input: TicketUpdateInput }>,
          DefaultContext,
          ApolloCache<unknown>
        >
      | undefined
  ): Promise<FetchResult<TicketUpdateMutation>>;
}

export const updateTicketMutation = async (props: IUpdateTicket) => {
  const {
    values,
    ticketId,
    setSuccess,
    updateTicket,
    setAlertMessage,
    setAlertMessageColor,
  } = props;

  setAlertMessage(null);
  try {
    const res = await updateTicket({
      variables: {
        input: {
          ticketId,
          title: values.title,
          description: values.description,
          status: values.status,
          storyPoints: Number(values.storyPoints),
          type: values.type,
          priority: values.priority,
          references: values.references,
        },
      },
    });
    if (res.data?.ticketUpdate.userErrors.length) {
      setAlertMessageColor('danger');
      const errorMessage = res.data.ticketUpdate.userErrors[0].message;
      const errorValues = res.data.ticketUpdate.userErrors[0].values;
      const translatedError = translateERR(errorMessage);

      if (errorMessage === ServerSideError.MISSING_FIELDS) {
        return setAlertMessage(`${translatedError}${errorValues?.toString()}`);
      }
      if (errorMessage === ServerSideError.UNIQUE_CONSTRAINT_FAIL) {
        setAlertMessage(`${translatedError}${errorValues?.toString()}`);
      } else {
        return setAlertMessage(translatedError);
      }
    }
    if (res.data?.ticketUpdate.ticket) {
      setSuccess(true);
      setAlertMessageColor('success');
      setAlertMessage(
        translate(TEXT.forms.ticketForms.UPDATE.alerts.successful)
      );
    }
  } catch (error) {
    setAlertMessage(translate(TEXT.ERRORS.SERVER_ERROR));
  }
};
