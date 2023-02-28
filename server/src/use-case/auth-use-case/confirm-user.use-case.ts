import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { JWTVerify } from '../../helpers/jwt';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import {
  BooleanPayload,
  MutationConfirmUserArgs,
} from '../../types/graphql-generated/graphql';

export type ConfirmUserInput = {
  args: MutationConfirmUserArgs;
  context: ApolloContext;
};

export const confirmUserUseCase = async (
  input: ConfirmUserInput
): Promise<BooleanPayload> => {
  const { token } = input.args;
  const { prisma } = input.context;

  const authPayload: BooleanPayload = {
    success: false,
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

  if (userById.confirmed) {
    return {
      ...authPayload,
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
      ...authPayload,
      success: confirmedUser.confirmed,
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error as Error);
    return {
      ...authPayload,
      userErrors,
    };
  }
};
