import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { userError } from '../../helpers/user-error';
import {
  QueryGetMyTicketsArgs,
  TicketsPayload,
} from '../../types/graphql-generated/graphql';
import { TicketPriority, TicketStatus, TicketType } from '../../types/types';

export type GetMyTicketsInput = {
  context: ApolloContext;
  args: QueryGetMyTicketsArgs;
};

export const getMyTicketsUseCase = async (
  input: GetMyTicketsInput
): Promise<TicketsPayload> => {
  const { prisma, user } = input.context;

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
      userId: user?.userId,
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
