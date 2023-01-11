import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { Operations } from '../../enum/operations.enum';
import { userError } from '../../helpers/user-error';
import { acceptedRoleAccessService } from '../../service/accepted-role-access/accepted-role-access.service';
import {
  GetUserPayload,
  QueryGetUserArgs,
} from '../../types/graphql-generated/graphql';

export type GetUserInput = {
  args: QueryGetUserArgs;
  context: ApolloContext;
};

export const getUserUseCase = async (
  input: GetUserInput
): Promise<GetUserPayload> => {
  const { id } = input.args;
  const { prisma, user } = input.context;

  if (!user?.userId) {
    return {
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
      user: null,
    };
  }

  const { errors: userErrors } = await acceptedRoleAccessService({
    userId: user.userId,
    prisma,
    operation: Operations.GET_USER,
  });

  if (userErrors.length) {
    return {
      userErrors: userErrors,
      user: null,
    };
  }

  const userResult = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return {
    userErrors: [],
    user: userResult,
  } as GetUserPayload;
};
