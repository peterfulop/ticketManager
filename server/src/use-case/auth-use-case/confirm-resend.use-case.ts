import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { sendEmail } from '../../helpers/send-email';
import { userError } from '../../helpers/user-error';
import {
  AuthPayload,
  MutationConfirmResendArgs,
} from '../../types/graphql-generated/graphql';
import { createConfirmationUrl } from '../../utils/create-confirmation-url';

export type ConfirmResendInput = {
  args: MutationConfirmResendArgs;
  context: ApolloContext;
};

export const confirmResendUseCase = async (
  input: ConfirmResendInput
): Promise<AuthPayload> => {
  const { email } = input.args;
  const { prisma } = input.context;

  const authPayload: AuthPayload = {
    success: false,
    userErrors: [],
  };

  const userByEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!userByEmail || userByEmail.confirmed) {
    return {
      ...authPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  try {
    await sendEmail(
      email,
      createConfirmationUrl(userByEmail.id, userByEmail.email)
    );
    return {
      ...authPayload,
      success: true,
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error);
    return {
      ...authPayload,
      userErrors,
    };
  }
};
