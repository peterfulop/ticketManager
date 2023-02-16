import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client';
import { Exact, TicketCreateInput } from '../../apollo/graphql-generated/types';
import { TicketCreateMutation } from '../../apollo/graphql/tickets/ticket.generated';
import { translate, translateERR } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { EServerSideError } from '../../types/enums/db-errors.enum';
import { MutationAlerts } from '../../types/interfaces/common.interface';

interface ICreateTicket extends MutationAlerts {
  values: TicketCreateInput;
  projectId: string;
  createTicket(
    options?:
      | MutationFunctionOptions<
          TicketCreateMutation,
          Exact<{ input: TicketCreateInput }>,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ): Promise<FetchResult<TicketCreateMutation>>;
}

export const createTicketMutation = async (props: ICreateTicket) => {
  const {
    values,
    projectId,
    setAlertMessage,
    setAlertMessageColor,
    setSuccess,
    createTicket,
  } = props;

  setAlertMessage(null);
  try {
    const res = await createTicket({
      variables: {
        input: {
          ...values,
          projectId,
          storyPoints: Number(values.storyPoints),
        },
      },
    });
    if (res.data?.ticketCreate.userErrors.length) {
      setAlertMessageColor('danger');
      const errorMessage = res.data.ticketCreate.userErrors[0].message;
      const errorValues = res.data.ticketCreate.userErrors[0].values;
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
    if (res.data?.ticketCreate.ticket) {
      setSuccess(true);
      setAlertMessageColor('success');
      setAlertMessage(
        translate(TEXT.forms.projectForms.CREATE.alerts.successful)
      );
    }
  } catch (error) {
    setAlertMessage(translate(TEXT.ERRORS.SERVER_ERROR));
  }
};
