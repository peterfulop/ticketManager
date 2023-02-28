import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import {
  BooleanPayload,
  MutationCollaborationDeleteArgs,
} from '../../types/graphql-generated/graphql';
import { Role } from '../../types/types';

export type DeleteCollaborationInput = {
  args: MutationCollaborationDeleteArgs;
  context: ApolloContext;
};

export const deleteCollaborationUseCase = async (
  input: DeleteCollaborationInput
): Promise<BooleanPayload> => {
  const { id } = input.args;
  const { prisma, user } = input.context;

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

  const collaboration = await prisma.collaboration.findUnique({
    where: { id },
  });

  if (!collaboration) {
    return {
      ...collaborationPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  const userRoleInTheProject = (
    await prisma.collaboration.findFirst({
      where: {
        inviterId: user.userId,
      },
    })
  )?.role;

  if (
    userRoleInTheProject !== Role.SUPER_ADMIN &&
    userRoleInTheProject !== Role.ADMIN
  ) {
    return {
      ...collaborationPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.PERMISSION_DENIED,
          values: [Role.SUPER_ADMIN],
        },
      ],
    };
  }

  // const { userErrors } = await canUserMutateService({
  //   prisma,
  //   userId: user?.userId,
  //   id: collaboration.id,
  //   targetTable: PrismaTable.COLLABORATION,
  // });

  // if (userErrors.length) {
  //   return {
  //     ...collaborationPayload,
  //     userErrors,
  //   };
  // }

  try {
    await prisma.collaboration.delete({ where: { id } });
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
