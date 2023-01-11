import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { userError } from '../../helpers/user-error';
import { GetUserPayload } from '../../types/graphql-generated/graphql';

export type GetMyProfileInput = {
  context: ApolloContext;
};

export const getMyProfileUseCase = async (
  input: GetMyProfileInput
): Promise<GetUserPayload> => {
  const { prisma, user } = input.context;

  if (!user?.userId) {
    return {
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
      user: null,
    };
  }

  const profile = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });

  if (!profile) {
    return {
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
      user: null,
    };
  }

  const { name, email, confirmed, createdAt, updatedAt } = profile;

  const myProfile = {
    name,
    email,
    confirmed,
    createdAt: new Date(createdAt).toLocaleDateString(),
    updatedAt: new Date(updatedAt).toLocaleDateString(),
  };

  return {
    userErrors: [],
    user: myProfile,
  } as unknown as GetUserPayload;
};
