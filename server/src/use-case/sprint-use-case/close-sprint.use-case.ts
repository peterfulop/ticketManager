import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { PrismaTable } from '../../enum/prisma-tables.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import { canUserMutateService } from '../../service/can-user-mutate/can-user-mutate.service';
import {
  MutationSprintCloseArgs,
  SprintPayload,
} from '../../types/graphql-generated/graphql';
import { TicketStatus } from '../../types/types';

export type CloseSprintInput = {
  args: MutationSprintCloseArgs;
  context: ApolloContext;
};

export const closeSprintUseCase = async (
  input: CloseSprintInput
): Promise<SprintPayload> => {
  const { sprintId } = input.args;
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

  const sprintToUpdate = await prisma.sprint.findUnique({
    where: { id: sprintId },
  });

  if (!sprintId || !sprintToUpdate) {
    return {
      ...sprintPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  if (sprintToUpdate.closed) {
    return {
      ...sprintPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.RECORD_DISABLED }],
    };
  }

  const { userErrors } = await canUserMutateService({
    prisma,
    userId: user?.userId,
    id: sprintToUpdate.id,
    targetTable: PrismaTable.SPRINT,
  });

  if (userErrors.length) {
    return {
      ...sprintPayload,
      userErrors,
    };
  }

  try {
    const sprint = await prisma.sprint.update({
      where: {
        id: sprintId,
      },
      data: {
        closed: true,
        updatedAt: new Date(Date.now()),
      },
    });

    await prisma.ticket.updateMany({
      where: {
        sprintId,
        status: TicketStatus.DONE,
      },
      data: {
        status: TicketStatus.ARCHIVED,
      },
    });

    await prisma.ticket.updateMany({
      where: {
        sprintId,
        status: {
          notIn: [
            TicketStatus.DONE,
            TicketStatus.ARCHIVED,
            TicketStatus.BACKLOG,
          ],
        },
      },
      data: {
        sprintId: null,
        status: TicketStatus.BACKLOG,
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
