import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { PrismaTable } from '../../enum/prisma-tables.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import { canUserMutateService } from '../../service/can-user-mutate/can-user-mutate.service';
import {
  MutationTicketUpdateArgs,
  TicketPayload,
} from '../../types/graphql-generated/graphql';
import { TicketPriority, TicketStatus, TicketType } from '../../types/types';
import { reduceObjectBy } from '../../utils/reduce-object';

export type UpdateTicketInput = {
  args: MutationTicketUpdateArgs;
  context: ApolloContext;
};

export const updateTicketUseCase = async (
  input: UpdateTicketInput
): Promise<TicketPayload> => {
  const {
    title,
    status,
    priority,
    type,
    projectId,
    description,
    comment,
    references,
    ticketId,
  } = input.args.input;
  const { prisma, user } = input.context;

  const ticketPayload: TicketPayload = {
    userErrors: [],
    ticket: null,
  };

  if (!user) {
    return {
      ...ticketPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const ticketToUpdate = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticketId || !ticketToUpdate) {
    return {
      ...ticketPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  if (projectId) {
    const isProjectExists = await prisma.project.findFirst({
      where: {
        userId: user?.userId,
        id: projectId,
      },
    });

    if (!isProjectExists) {
      return {
        ...ticketPayload,
        userErrors: [
          {
            ...userError,
            message: DBErrorMessages.MISSING_RECORD,
            values: [projectId],
          },
        ],
      };
    }
  }

  const { userErrors } = await canUserMutateService({
    prisma,
    userId: user?.userId,
    id: ticketToUpdate.id,
    targetTable: PrismaTable.TICKET,
  });

  if (userErrors.length) {
    return {
      ...ticketPayload,
      userErrors,
    };
  }

  const reducedInputs = reduceObjectBy({
    title,
    status,
    priority,
    type,
    projectId,
    comment,
    references,
  });

  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        ...reducedInputs,
        description,
        updatedAt: new Date(Date.now()),
      },
    });

    return {
      ...ticketPayload,
      ticket: {
        ...ticket,
        status: status ? TicketStatus[status] : TicketStatus.BACKLOG,
        priority: priority ? TicketPriority[priority] : TicketPriority.MEDIUM,
        type: ticket.type ? TicketType[ticket.type] : TicketType.TASK,
        storyPoints: ticket.storyPoints,
        sequenceId: ticket.sequenceId as string,
        createdAt: ticket.createdAt.toISOString(),
        updatedAt: ticket.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error);
    return {
      ...ticketPayload,
      userErrors,
    };
  }
};
