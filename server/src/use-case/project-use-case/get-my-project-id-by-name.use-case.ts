import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { userError } from '../../helpers/user-error';
import {
  ProjectIdByNamePayload,
  QueryGetMyProjectIdByNameArgs,
} from '../../types/graphql-generated/graphql';

export type GetProjectsByUserInput = {
  args: QueryGetMyProjectIdByNameArgs;
  context: ApolloContext;
};

export const getMyProjectByNameUseCase = async (
  input: GetProjectsByUserInput
): Promise<ProjectIdByNamePayload> => {
  const { projectName } = input.args;
  const { prisma, user } = input.context;

  if (!user) {
    return {
      projectId: '',
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const project = await prisma.project.findFirst({
    where: {
      name: projectName,
      userId: user.userId,
    },
  });

  if (!project) {
    return {
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
      projectId: null,
    };
  }

  return {
    userErrors: [],
    projectId: project?.id,
  };
};
