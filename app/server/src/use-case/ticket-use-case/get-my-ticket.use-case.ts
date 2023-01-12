import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { userError } from '../../helpers/user-error';
import {
  QueryGetTicketArgs,
  TicketPayload,
} from '../../types/graphql-generated/graphql';
import { TicketPriority, TicketStatus, TicketType } from '../../types/types';

export type GetMyTicketInput = {
  args: QueryGetTicketArgs;
  context: ApolloContext;
};

export const getMyTicketUseCase = async (
  input: GetMyTicketInput
): Promise<TicketPayload> => {
  const { prisma, user } = input.context;
  const { id } = input.args;

  const ticketPayload: TicketPayload = {
    userErrors: [],
    ticket: null,
  };

  const ticket = await prisma.ticket.findFirst({
    where: {
      id,
      userId: user?.userId,
    },
  });

  if (!ticket) {
    return {
      ...ticketPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  return {
    userErrors: [],
    ticket: {
      ...ticket,
      status: ticket.status
        ? TicketStatus[ticket.status]
        : TicketStatus.BACKLOG,
      priority: ticket.priority
        ? TicketPriority[ticket.priority]
        : TicketPriority.MEDIUM,
      storyPoints: ticket.storyPoints,
      type: ticket.type ? TicketType[ticket.type] : TicketType.TASK,
      createdAt: ticket.createdAt.toISOString(),
      updatedAt: ticket.updatedAt.toISOString(),
    },
  };
};
