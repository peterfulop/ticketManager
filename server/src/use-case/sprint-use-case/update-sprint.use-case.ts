import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { PrismaTable } from '../../enum/prisma-tables.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import { canUserMutateService } from '../../service/can-user-mutate/can-user-mutate.service';
import {
  MutationSprintUpdateArgs,
  SprintPayload,
} from '../../types/graphql-generated/graphql';
import { reduceObjectBy } from '../../utils/reduce-object';

export type UpdateSprintInput = {
  args: MutationSprintUpdateArgs;
  context: ApolloContext;
};

export const updateSprintUseCase = async (
  input: UpdateSprintInput
): Promise<SprintPayload> => {
  const { sprintId, title, goal, startDate, endDate } = input.args.input;
  const { prisma, user } = input.context;

  const sprintPayload: SprintPayload = {
    userErrors: [],
    sprint: null,
  };

  if (!user) {
    return {
      sprint: null,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const SprintToUpdate = await prisma.sprint.findUnique({
    where: { id: sprintId },
  });

  if (!sprintId || !SprintToUpdate) {
    return {
      ...sprintPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  if (SprintToUpdate.closed) {
    return {
      ...sprintPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.RECORD_DISABLED }],
    };
  }

  const { userErrors } = await canUserMutateService({
    prisma,
    userId: user?.userId,
    id: SprintToUpdate.id,
    targetTable: PrismaTable.PROJECT,
  });

  if (userErrors.length) {
    return {
      ...sprintPayload,
      userErrors,
    };
  }

  const reducedInputs = reduceObjectBy({
    title,
    goal,
    startDate,
    endDate,
    closed,
  });

  try {
    const sprint = await prisma.sprint.update({
      where: {
        id: sprintId,
      },
      data: {
        ...reducedInputs,
        updatedAt: new Date(Date.now()),
      },
    });

    return {
      ...sprintPayload,
      sprint: {
        ...sprint,
        startDate: sprint.startDate.toISOString(),
        endDate: sprint.endDate.toISOString(),
        createdAt: sprint.createdAt.toISOString(),
        updatedAt: sprint.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error as Error);
    return {
      ...sprintPayload,
      userErrors,
    };
  }
};
