import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import {
  MutationProjectCreateArgs,
  ProjectPayload,
} from '../../types/graphql-generated/graphql';

export type CreateProjectInput = {
  args: MutationProjectCreateArgs;
  context: ApolloContext;
};

export const createProjectUseCase = async (
  input: CreateProjectInput
): Promise<ProjectPayload> => {
  const { name } = input.args.input;
  const { user } = input.context;
  const { prisma } = input.context;

  const projectPayload: ProjectPayload = {
    userErrors: [],
    project: null,
  };

  if (!user) {
    return {
      ...projectPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const userExists = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });

  if (!userExists) {
    return {
      ...projectPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.UNAUTHENTICATED }],
    };
  }

  if (!name) {
    input.args.input;
    return {
      ...projectPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.MISSING_FIELDS,
          values: ['name'],
        },
      ],
    };
  }

  try {
    const project = await prisma.project.create({
      data: {
        name,
        userId: user.userId,
      },
    });
    return {
      ...projectPayload,
      project: {
        ...project,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
        tickets: [],
      },
    } as unknown as ProjectPayload;
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error as Error);
    return {
      ...projectPayload,
      userErrors,
    };
  }
};
