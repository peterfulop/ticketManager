import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { PrismaTable } from '../../enum/prisma-tables.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import { canUserMutateService } from '../../service/can-user-mutate/can-user-mutate.service';
import {
  BooleanPayload,
  MutationSprintDeleteArgs,
} from '../../types/graphql-generated/graphql';

export type DeleteSprintInput = {
  args: MutationSprintDeleteArgs;
  context: ApolloContext;
};

export const deleteSprintUseCase = async (
  input: DeleteSprintInput
): Promise<BooleanPayload> => {
  const { id } = input.args;
  const { prisma, user } = input.context;

  const sprintDeletePayload: BooleanPayload = {
    success: false,
    userErrors: [],
  };

  if (!user) {
    return {
      ...sprintDeletePayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const sprintToDelete = await prisma.sprint.findUnique({ where: { id } });

  if (!sprintToDelete) {
    return {
      ...sprintDeletePayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  const { userErrors } = await canUserMutateService({
    prisma,
    userId: user?.userId,
    id: sprintToDelete.id,
    targetTable: PrismaTable.SPRINT,
  });

  if (userErrors.length) {
    return {
      ...sprintDeletePayload,
      userErrors,
    };
  }

  try {
    await prisma.sprint.delete({ where: { id } });
    return {
      ...sprintDeletePayload,
      success: true,
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error as Error);
    return {
      ...sprintDeletePayload,
      userErrors,
    };
  }
};
