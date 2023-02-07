import { ApolloContext } from '../../apollo';
import {
  ResolversParentTypes,
  Ticket,
} from '../../types/graphql-generated/graphql';

export type GetTicketsByUserIdUseCaseInput = {
  parent: ResolversParentTypes['Ticket'];
  context: ApolloContext;
};

export const getTicketssByUserIdUseCase = async (
  input: GetTicketsByUserIdUseCaseInput
): Promise<Ticket> => {
  const { prisma, user } = input.context;
  return (await prisma.ticket.findMany({
    where: {
      userId: user?.userId,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })) as unknown as Ticket;
};
