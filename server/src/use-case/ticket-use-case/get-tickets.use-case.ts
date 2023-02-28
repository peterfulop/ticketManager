import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { userError } from '../../helpers/user-error';
import {
  QueryGetTicketsArgs,
  TicketsPayload,
} from '../../types/graphql-generated/graphql';
import { TicketPriority, TicketStatus, TicketType } from '../../types/types';

export type GetTicketsInput = {
  context: ApolloContext;
  args: QueryGetTicketsArgs;
};

export const getTicketsUseCase = async (
  input: GetTicketsInput
): Promise<TicketsPayload> => {
  const { prisma, user } = input.context;
  const { projectId } = input.args;
  const searchParams = input.args.input || {};

  if (!user) {
    return {
      tickets: [],
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      projectId,
      ...searchParams,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  const ticketsWithDate = tickets.map((ticket) => {
    return {
      ...ticket,
      status: ticket.status
        ? TicketStatus[ticket.status]
        : TicketStatus.BACKLOG,
      priority: ticket.priority
        ? TicketPriority[ticket.priority]
        : TicketPriority.MEDIUM,
      storyPoins: ticket.storyPoints,
      type: ticket.type ? TicketType[ticket.type] : TicketType.TASK,
      sequenceId: ticket.sequenceId as string,
      createdAt: ticket.createdAt.toISOString(),
      updatedAt: ticket.updatedAt.toISOString(),
    };
  });

  return {
    userErrors: [],
    tickets: ticketsWithDate,
  };
};
