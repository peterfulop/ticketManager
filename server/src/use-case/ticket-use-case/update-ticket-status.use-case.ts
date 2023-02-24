import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { PrismaTable } from '../../enum/prisma-tables.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import { canUserMutateService } from '../../service/can-user-mutate/can-user-mutate.service';
import { TicketPayload } from '../../types/graphql-generated/graphql';
import {
  MutationTicketStatusUpdateArgs,
  TicketPriority,
  TicketStatus,
  TicketType,
} from '../../types/types';

export type UpdateTicketStatusInput = {
  args: MutationTicketStatusUpdateArgs;
  context: ApolloContext;
};

export const updateTicketStatusUseCase = async (
  input: UpdateTicketStatusInput
): Promise<TicketPayload> => {
  const { status, ticketId } = input.args.input;
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

  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status,
        updatedAt: new Date(Date.now()),
      },
    });

    return {
      ...ticketPayload,
      ticket: {
        ...ticket,
        status: status ? TicketStatus[status] : TicketStatus.BACKLOG,
        priority: TicketPriority[ticket.priority],
        type: ticket.type ? TicketType[ticket.type] : TicketType.TASK,
        storyPoints: ticket.storyPoints,
        sequenceId: ticket.sequenceId as string,
        createdAt: ticket.createdAt.toISOString(),
        updatedAt: ticket.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error as Error);
    return {
      ...ticketPayload,
      userErrors,
    };
  }
};
