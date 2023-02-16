import { ApolloContext } from '../../apollo';
import {
  AuthPayload,
  MutationConfirmResendArgs,
  MutationConfirmUserArgs,
  MutationSigninArgs,
  MutationSignupArgs,
  QueryVerifyUserArgs,
} from '../../types/graphql-generated/graphql';
import { SigninPayload, VerifyPayload } from '../../types/types';

import { confirmResendUseCase } from '../../use-case/auth-use-case/confirm-resend.use-case';
import { confirmUserUseCase } from '../../use-case/auth-use-case/confirm-user.use-case';
import { signinUseCase } from '../../use-case/auth-use-case/signin.use-case';
import { signupUseCase } from '../../use-case/auth-use-case/signup.use-case';
import { verifyUserUseCase } from '../../use-case/auth-use-case/verify-user.use-case';

export const authGQLResolver = {
  Query: {
    verifyUser: async (
      _parent: any,
      args: QueryVerifyUserArgs,
      context: ApolloContext
    ): Promise<VerifyPayload> => {
      return await verifyUserUseCase({ args, context });
    },
  },
  Mutation: {
    signup: async (
      _parent: any,
      args: MutationSignupArgs,
      context: ApolloContext
    ): Promise<AuthPayload> => {
      return await signupUseCase({ args, context });
    },
    signin: async (
      _parent: any,
      args: MutationSigninArgs,
      context: ApolloContext
    ): Promise<SigninPayload> => {
      return await signinUseCase({ args, context });
    },
    confirmUser: async (
      _parent: any,
      args: MutationConfirmUserArgs,
      context: ApolloContext
    ): Promise<AuthPayload> => {
      return await confirmUserUseCase({ args, context });
    },
    confirmResend: async (
      _parent: any,
      args: MutationConfirmResendArgs,
      context: ApolloContext
    ): Promise<AuthPayload> => {
      return await confirmResendUseCase({ args, context });
    },
  },
};
