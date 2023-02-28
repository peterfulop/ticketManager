import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { userError } from '../../helpers/user-error';
import {
  ProjectPayload,
  QueryGetProjectArgs,
} from '../../types/graphql-generated/graphql';
import { Role } from '../../types/types';

export type GetProjectInput = {
  args: QueryGetProjectArgs;
  context: ApolloContext;
};

export const getProjectUseCase = async (
  input: GetProjectInput
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
      id,
    },
  });

  if (!project) {
    return {
      ...projectPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  if (project.userId !== user.userId) {
    const userRoleInTheProject = (
      await prisma.collaboration.findFirst({
        where: {
          userId: user.userId,
          projectId: id,
        },
      })
    )?.role;

    if (!userRoleInTheProject) {
      return {
        ...projectPayload,
        userErrors: [
          { ...userError, message: DBErrorMessages.PERMISSION_DENIED },
        ],
      };
    }

    if (userRoleInTheProject !== Role.SUPER_ADMIN) {
      if (!project.shared) {
        return {
          ...projectPayload,
          userErrors: [
            { ...userError, message: DBErrorMessages.UNSHARED_PROJECT },
          ],
        };
      }
    }
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
