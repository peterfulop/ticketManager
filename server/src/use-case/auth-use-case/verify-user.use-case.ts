import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { JWTVerify } from '../../helpers/jwt';
import { userError } from '../../helpers/user-error';
import { QueryVerifyUserArgs } from '../../types/graphql-generated/graphql';
import { VerifyPayload } from '../../types/types';

export type VerifyUserInput = {
  args: QueryVerifyUserArgs;
  context: ApolloContext;
};

export const verifyUserUseCase = async (
  input: VerifyUserInput
): Promise<VerifyPayload> => {
  const { token } = input.args;
  const { prisma } = input.context;

  const verifyPayload: VerifyPayload = {
    user: null,
    userErrors: [],
  };

  const user = JWTVerify(token);

  if (!user) {
    return {
      ...verifyPayload,
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
      ...verifyPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }
  return {
    ...verifyPayload,
    user: {
      ...userById,
      createdAt: userById.createdAt.toISOString(),
      updatedAt: userById.updatedAt.toISOString(),
      tickets: [], // Update later!
      projects: [], // Update later!
    },
  };
};
