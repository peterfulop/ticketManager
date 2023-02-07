import { ApolloContext } from '../../apollo';
import {
  Project,
  ResolversParentTypes,
} from '../../types/graphql-generated/graphql';

export type GetProjectsByUserIdUseCaseInput = {
  parent: ResolversParentTypes['Project'];
  context: ApolloContext;
};

export const getProjectsByUserIdUseCase = async (
  input: GetProjectsByUserIdUseCaseInput
): Promise<Project> => {
  const { prisma, user } = input.context;
  return (await prisma.project.findMany({
    where: {
      userId: user?.userId,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })) as unknown as Project;
};
