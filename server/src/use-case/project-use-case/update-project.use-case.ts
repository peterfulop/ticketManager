import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { PrismaTable } from '../../enum/prisma-tables.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import { canUserMutateService } from '../../service/can-user-mutate/can-user-mutate.service';
import {
  MutationProjectUpdateArgs,
  ProjectPayload,
} from '../../types/graphql-generated/graphql';
import { Role } from '../../types/types';
import { reduceObjectBy } from '../../utils/reduce-object';

export type UpdateProjectInput = {
  args: MutationProjectUpdateArgs;
  context: ApolloContext;
};

export const updateProjectUseCase = async (
  input: UpdateProjectInput
): Promise<ProjectPayload> => {
  const { name, projectId, shared } = input.args.input;
  const { prisma, user } = input.context;

  const projectPayload: ProjectPayload = {
    userErrors: [],
    project: null,
  };

  if (!user) {
    return {
      project: null,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const projectToUpdate = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!projectId || !projectToUpdate) {
    return {
      ...projectPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  const { userErrors } = await canUserMutateService({
    prisma,
    userId: user?.userId,
    id: projectToUpdate.id,
    targetTable: PrismaTable.PROJECT,
  });

  if (userErrors.length) {
    return {
      ...projectPayload,
      userErrors,
    };
  }

  const reducedInputs = reduceObjectBy({
    name,
  });

  try {
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...reducedInputs,
        shared,
        updatedAt: new Date(Date.now()),
      },
    });

    if (shared) {
      await prisma.collaboration.create({
        data: {
          userId: user.userId,
          inviterId: user.userId,
          projectId: project.id,
          role: Role.SUPER_ADMIN,
        },
      });
    }

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
