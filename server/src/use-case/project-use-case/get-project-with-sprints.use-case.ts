import { ApolloContext } from '../../apollo';
import {
  ResolversParentTypes,
  Sprint,
} from '../../types/graphql-generated/graphql';

export type GetProjectWithSprintsUseCaseInput = {
  parent: ResolversParentTypes['Sprint'];
  context: ApolloContext;
};

export const getProjectWithSprintsUseCase = async (
  input: GetProjectWithSprintsUseCaseInput
): Promise<Sprint> => {
  const { prisma } = input.context;
  const parent = input.parent;

  return (await prisma.sprint.findMany({
    where: {
      projectId: parent.id,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })) as unknown as Sprint;
};
