import bcrypt from 'bcrypt';
import { validate } from 'email-validator';
import { ApolloContext } from '../../apollo';
import { config } from '../../config/config';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { JWTSign } from '../../helpers/jwt';
import { userError } from '../../helpers/user-error';
import {
  AuthPayload,
  MutationSigninArgs,
} from '../../types/graphql-generated/graphql';

export type SignupInput = {
  args: MutationSigninArgs;
  context: ApolloContext;
};

export const signinUseCase = async (
  input: SignupInput
): Promise<AuthPayload> => {
  const { email, password } = input.args.input;
  const { prisma } = input.context;

  const authPayload: AuthPayload = {
    token: null,
    userErrors: [],
  };

  if (!email || !password) {
    return {
      ...authPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_INPUTS }],
    };
  }

  if (!validate(email)) {
    return {
      ...authPayload,
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
      ...authPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  if (!userByEmail.confirmed) {
    return {
      ...authPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.UNCONFIRMED_USER }],
    };
  }

  const passwordMatch = await bcrypt.compare(password, userByEmail.password);
  if (!userByEmail || !passwordMatch) {
    return {
      ...authPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const token = JWTSign({
    userId: userByEmail.id,
    email,
    expiresIn: config.cookie.sessiontokenExp,
  });

  return {
    ...authPayload,
    token,
  };
};
