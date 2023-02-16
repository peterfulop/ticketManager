import bcrypt from 'bcrypt';
import { validate } from 'email-validator';
import { v4 } from 'uuid';
import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { sendEmail } from '../../helpers/send-email';
import { userError } from '../../helpers/user-error';
import {
  AuthPayload,
  MutationSignupArgs,
} from '../../types/graphql-generated/graphql';
import { createConfirmationUrl } from '../../utils/create-confirmation-url';

export type SignupInput = {
  args: MutationSignupArgs;
  context: ApolloContext;
};

export const signupUseCase = async (
  input: SignupInput
): Promise<AuthPayload> => {
  const { name, credentials, passwordConfirm } = input.args.input;
  const { email, password } = credentials;
  const { prisma } = input.context;

  const authPayload: AuthPayload = {
    success: false,
    userErrors: [],
  };

  if (!name || !email || !password) {
    return {
      ...authPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.MISSING_SIGNUP_DATA },
      ],
    };
  }

  if (password.length < 6) {
    return {
      ...authPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.SHORT_PASSWORD }],
    };
  }
  if (password !== passwordConfirm) {
    return {
      ...authPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.PASSWORDS_DO_NOT_MATCH },
      ],
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

  const isEmailInUse = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isEmailInUse) {
    return {
      ...authPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.EMAIL_ADDRESS_ALREADY_IN_USE },
      ],
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        id: v4(),
        name,
        email,
        password: hashedPassword,
      },
    });

    await sendEmail(email, createConfirmationUrl(user.id, user.email));

    return {
      ...authPayload,
      success: true,
    };
  } catch (error: unknown) {
    return {
      ...authPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.SERVER_ERROR }],
    };
  }
};
