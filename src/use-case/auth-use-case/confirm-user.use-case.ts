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

  const authPayload: ConfirmPayload = {
    confirmed: null,
    userErrors: [],
  };

  const user = JWTVerify(token);

  if (!user) {
    return {
      ...authPayload,
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
      ...authPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  const confirmedUser = await prisma.user.update({
    where: {
      id: user.userId,
    },
    data: {
      confirmed: true,
    },
  });

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
      ...authPayload,
      confirmed: confirmedUser.confirmed,
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error);
    return {
      ...authPayload,
      userErrors,
    };
  }
};
