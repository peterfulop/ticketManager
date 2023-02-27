import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import { SprintPayload } from '../../types/graphql-generated/graphql';
import { MutationSprintCreateArgs } from '../../types/types';
import { reduceObjectBy } from '../../utils/reduce-object';

export type CreateSprintInput = {
  args: MutationSprintCreateArgs;
  context: ApolloContext;
};

export const createSprintUseCase = async (
  input: CreateSprintInput
): Promise<SprintPayload> => {
  const { projectId, title, goal, startDate, endDate } = input.args.input;
  const { user } = input.context;
  const { prisma } = input.context;

  const sprintPayload: SprintPayload = {
    userErrors: [],
    sprint: null,
  };

  if (!user) {
    return {
      ...sprintPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const userExists = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });

  if (!userExists) {
    return {
      ...sprintPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.UNAUTHENTICATED }],
    };
  }

  if (!title || !projectId || !goal || !startDate || !endDate) {
    const missingFields = Object.keys(reduceObjectBy(input.args.input, true));
    return {
      ...sprintPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.MISSING_FIELDS,
          values: missingFields,
        },
      ],
    };
  }

  try {
    const sprint = await prisma.sprint.create({
      data: {
        projectId,
        userId: user.userId,
        title,
        goal,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
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
