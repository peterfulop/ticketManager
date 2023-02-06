import bcrypt from 'bcrypt';
import { validate } from 'email-validator';
import { ApolloContext } from '../../apollo';
import { config } from '../../config/config';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { JWTSign } from '../../helpers/jwt';
import { userError } from '../../helpers/user-error';
import { MutationSigninArgs } from '../../types/graphql-generated/graphql';
import { SigninPayload } from '../../types/types';

export type SignupInput = {
  args: MutationSigninArgs;
  context: ApolloContext;
};

export const signinUseCase = async (
  input: SignupInput
): Promise<SigninPayload> => {
  const { email, password } = input.args.input;
  const { prisma } = input.context;

  const signinPayload: SigninPayload = {
    token: null,
    user: null,
    userErrors: [],
  };

  if (!email || !password) {
    return {
      ...signinPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_INPUTS }],
    };
  }

  if (!validate(email)) {
    return {
      ...signinPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.INVALID_EMAIL_ADDRESS },
      ],
    };
  }

  const userByEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userByEmail) {
    return {
      ...signinPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const passwordMatch = await bcrypt.compare(password, userByEmail.password);
  if (!userByEmail || !passwordMatch) {
    return {
      ...signinPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  if (!userByEmail.confirmed) {
    return {
      ...signinPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.UNCONFIRMED_USER }],
    };
  }

  const token = JWTSign({
    userId: userByEmail.id,
    email,
    expiresIn: config.cookie.sessiontokenExp,
  });

  return {
    ...signinPayload,
    token,
    user: {
      ...userByEmail,
      createdAt: userByEmail.createdAt.toISOString(),
      updatedAt: userByEmail.updatedAt.toISOString(),
    },
  };
};
