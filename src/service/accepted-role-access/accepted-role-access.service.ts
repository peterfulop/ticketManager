import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { Operations } from '../../enum/operations.enum';
import { userError } from '../../helpers/user-error';
import { UserError } from '../../types/graphql-generated/graphql';

export type AcceptedRoleAccessServiceInput = {
  userId: string;
  operation: Operations;
  prisma: ApolloContext['prisma'];
};

export type PermissionPayload = {
  errors: UserError[];
};

export const acceptedRoleAccessService = async (
  input: AcceptedRoleAccessServiceInput
): Promise<PermissionPayload> => {
  const { prisma, userId } = input;

  const permissionPayload: PermissionPayload = {
    errors: [],
  };

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      ...permissionPayload,
      errors: [{ ...userError, message: DBErrorMessages.USER_UNAUTHORIZED }],
    };
  }
  return {
    ...permissionPayload,
  };
};
