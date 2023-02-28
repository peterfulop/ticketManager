import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { userError } from '../../helpers/user-error';
import {
  CollaborationPayload,
  QueryGetCollaborationArgs,
} from '../../types/graphql-generated/graphql';

export type GetCollaborationInput = {
  args: QueryGetCollaborationArgs;
  context: ApolloContext;
};

export const getCollaborationUseCase = async (
  input: GetCollaborationInput
): Promise<CollaborationPayload> => {
  const { prisma, user } = input.context;
  const { id } = input.args;

  const collaborationPayload: CollaborationPayload = {
    userErrors: [],
    collaboration: null,
  };

  if (!user) {
    return {
      ...collaborationPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const collaboration = await prisma.collaboration.findFirst({
    where: {
      id,
      userId: user?.userId,
    },
  });

  if (!collaboration) {
    return {
      ...collaborationPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  return {
    userErrors: [],
    collaboration: collaboration,
  } as unknown as CollaborationPayload;
};
