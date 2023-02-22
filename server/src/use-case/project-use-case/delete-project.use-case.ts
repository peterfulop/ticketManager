import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { PrismaTable } from '../../enum/prisma-tables.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import { canUserMutateService } from '../../service/can-user-mutate/can-user-mutate.service';
import {
  MutationProjectDeleteArgs,
  ProjectDeletePayload,
} from '../../types/graphql-generated/graphql';

export type DeleteProjectInput = {
  args: MutationProjectDeleteArgs;
  context: ApolloContext;
};

export const deleteProjectUseCase = async (
  input: DeleteProjectInput
): Promise<ProjectDeletePayload> => {
  const { id } = input.args;
  const { prisma, user } = input.context;

  const projectDeletePayload: ProjectDeletePayload = {
    success: false,
    userErrors: [],
  };

  if (!user) {
    return {
      ...projectDeletePayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const projectToDelete = await prisma.project.findUnique({ where: { id } });

  if (!projectToDelete) {
    return {
      ...projectDeletePayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  const { userErrors } = await canUserMutateService({
    prisma,
    userId: user?.userId,
    id: projectToDelete.id,
    targetTable: PrismaTable.PROJECT,
  });

  if (userErrors.length) {
    return {
      ...projectDeletePayload,
      userErrors,
    };
  }

  try {
    await prisma.project.delete({ where: { id } });
    return {
      ...projectDeletePayload,
      success: true,
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error);
    return {
      ...projectDeletePayload,
      userErrors,
    };
  }
};
