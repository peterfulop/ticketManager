import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { userError } from '../../helpers/user-error';
import {
  ProjectPayload,
  QueryGetMyProjectArgs,
} from '../../types/graphql-generated/graphql';

export type GetMyProjectInput = {
  args: QueryGetMyProjectArgs;
  context: ApolloContext;
};

export const getMyProjectUseCase = async (
  input: GetMyProjectInput
): Promise<ProjectPayload> => {
  const { prisma, user } = input.context;
  const { id } = input.args;

  const projectPayload: ProjectPayload = {
    project: null,
    userErrors: [],
  };

  if (!user) {
    return {
      ...projectPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const project = await prisma.project.findFirst({
    where: {
      userId: user.userId,
      id,
    },
  });

  if (!project) {
    return {
      ...projectPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  const projectsWithDate = {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };

  return {
    ...projectPayload,
    project: projectsWithDate,
  } as unknown as ProjectPayload;
};
