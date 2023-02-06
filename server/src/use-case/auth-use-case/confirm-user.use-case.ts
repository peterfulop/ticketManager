import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { JWTVerify } from '../../helpers/jwt';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import {
  ConfirmPayload,
  MutationConfirmUserArgs,
} from '../../types/graphql-generated/graphql';

export type ConfirmUserInput = {
  args: MutationConfirmUserArgs;
  context: ApolloContext;
};

export const confirmUserUseCase = async (
  input: ConfirmUserInput
): Promise<ConfirmPayload> => {
  const { token } = input.args;
  const { prisma } = input.context;

  const confirmPayload: ConfirmPayload = {
    confirmed: null,
    userErrors: [],
  };

  const user = JWTVerify(token);

  if (!user) {
    return {
      ...confirmPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.AUTHORIZATION_FAILED,
          values: [DBErrorMessages.EXPIRED_TOKEN],
        },
      ],
    };
  }

  const userById = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });

  if (!userById) {
    return {
      ...confirmPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  if (userById.confirmed) {
    return {
      ...confirmPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.ALREADY_CONFIRMED_USER },
      ],
    };
  }

  try {
    const confirmedUser = await prisma.user.update({
      where: {
        id: user.userId,
      },
      data: {
        confirmed: true,
      },
    });
    return {
      ...confirmPayload,
      confirmed: confirmedUser.confirmed,
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error);
    return {
      ...confirmPayload,
      userErrors,
    };
  }
};
