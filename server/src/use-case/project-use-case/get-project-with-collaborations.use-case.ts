import { ApolloContext } from '../../apollo';
import {
  ResolversParentTypes,
  User,
} from '../../types/graphql-generated/graphql';
import { Role } from '../../types/types';

export type GetProjectWithCollaborationsUseCaseInput = {
  parent: ResolversParentTypes['User'];
  context: ApolloContext;
};

export const getProjectWithCollaborationsUseCase = async (
  input: GetProjectWithCollaborationsUseCaseInput
): Promise<User> => {
  const { prisma } = input.context;
  const parent = input.parent;

  const collabs = await prisma.collaboration.findMany({
    where: {
      projectId: parent.id,
    },
  });

  const collabUsers = collabs
    .filter((coll) => coll.role !== Role.SUPER_ADMIN)
    .map((coll) => coll.userId);

  return (await prisma.user.findMany({
    where: {
      id: {
        in: collabUsers,
      },
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })) as unknown as User;
};
