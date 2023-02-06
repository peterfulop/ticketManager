import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { sendEmail } from '../../helpers/send-email';
import { userError } from '../../helpers/user-error';
import { MutationConfirmResendArgs } from '../../types/graphql-generated/graphql';
import { ConfirmResendPayload } from '../../types/types';
import { createConfirmationUrl } from '../../utils/create-confirmation-url';

export type ConfirmResendInput = {
  args: MutationConfirmResendArgs;
  context: ApolloContext;
};

export const confirmResendUseCase = async (
  input: ConfirmResendInput
): Promise<ConfirmResendPayload> => {
  const { email } = input.args;
  const { prisma } = input.context;

  const confirmResendPayload: ConfirmResendPayload = {
    resent: false,
    userErrors: [],
  };

  const userByEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!userByEmail || userByEmail.confirmed) {
    return {
      ...confirmResendPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  try {
    await sendEmail(
      email,
      createConfirmationUrl(userByEmail.id, userByEmail.email)
    );
    return {
      ...confirmResendPayload,
      resent: true,
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error);
    return {
      ...confirmResendPayload,
      userErrors,
    };
  }
};
