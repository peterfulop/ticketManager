import { ApolloContext } from '../../apollo';
import {
  ResolversParentTypes,
  Ticket,
} from '../../types/graphql-generated/graphql';

export type GetProjectWithProjectsLoaderUseCaseInput = {
  parent: ResolversParentTypes['Project'];
  context: ApolloContext;
};

export const getProjectWithTicketsUseCase = async (
  input: GetProjectWithProjectsLoaderUseCaseInput
): Promise<Ticket> => {
  const { prisma, user } = input.context;
  const parent = input.parent;
  return (await prisma.ticket.findMany({
    where: {
      projectId: parent.id,
      userId: user?.userId,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })) as unknown as Ticket;
};
