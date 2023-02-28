import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import { BooleanPayload } from '../../types/graphql-generated/graphql';
import { MutationCollaborationCreateArgs, Role } from '../../types/types';
import { reduceObjectBy } from '../../utils/reduce-object';

export type CreateCollaborationInput = {
  args: MutationCollaborationCreateArgs;
  context: ApolloContext;
};

export const createCollaborationUseCase = async (
  input: CreateCollaborationInput
): Promise<BooleanPayload> => {
  const { projectId, userId, role } = input.args.input;
  const { user } = input.context;
  const { prisma } = input.context;

  const collaborationPayload: BooleanPayload = {
    userErrors: [],
    success: false,
  };

  if (!user) {
    return {
      ...collaborationPayload,
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
      ...collaborationPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.UNAUTHENTICATED }],
    };
  }

  if (!userId || !projectId) {
    const missingFields = Object.keys(reduceObjectBy(input.args.input, true));
    return {
      ...collaborationPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.MISSING_FIELDS,
          values: missingFields,
        },
      ],
    };
  }

  const isProjectExists = await prisma.project.findFirst({
    where: {
      userId: user?.userId,
      id: projectId,
    },
  });

  if (!isProjectExists) {
    return {
      ...collaborationPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.MISSING_RECORD,
          values: [projectId],
        },
      ],
    };
  }

  if (!isProjectExists.shared) {
    return {
      ...collaborationPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.UNSHARED_PROJECT,
          values: [projectId],
        },
      ],
    };
  }

  const currentUserRole = (
    await prisma.collaboration.findFirst({
      where: {
        userId: user.userId,
        projectId,
      },
    })
  )?.role;

  if (currentUserRole !== Role.ADMIN && currentUserRole !== Role.SUPER_ADMIN) {
    return {
      ...collaborationPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.PERMISSION_DENIED,
          values: [userId],
        },
      ],
    };
  }

  const isUserExists = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!isUserExists) {
    return {
      ...collaborationPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.MISSING_RECORD,
          values: [userId],
        },
      ],
    };
  }

  const isCollaborationExists = await prisma.collaboration.findFirst({
    where: {
      userId,
      projectId,
    },
  });

  if (isCollaborationExists) {
    return {
      ...collaborationPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.RECORD_ALREADY_EXISTS,
        },
      ],
    };
  }

  try {
    await prisma.collaboration.create({
      data: {
        userId,
        projectId,
        inviterId: user.userId,
        role,
      },
    });
    return {
      ...collaborationPayload,
      success: true,
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error as Error);
    return {
      ...collaborationPayload,
      userErrors,
    };
  }
};
