import { ApolloContext } from '../../apollo';
import {
  AuthPayload,
  ConfirmPayload,
  MutationConfirmResendArgs,
  MutationConfirmUserArgs,
  MutationSigninArgs,
  MutationSignupArgs,
} from '../../types/graphql-generated/graphql';
import { confirmResendUseCase } from '../../use-case/auth-use-case/confirm-resend.use-case';
import { confirmUserUseCase } from '../../use-case/auth-use-case/confirm-user.use-case';
import { signinUseCase } from '../../use-case/auth-use-case/signin.use-case';
import { signupUseCase } from '../../use-case/auth-use-case/signup.use-case';

export const authGQLResolver = {
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
    ): Promise<AuthPayload> => {
      return await signinUseCase({ args, context });
    },
    confirmUser: async (
      _parent: any,
      args: MutationConfirmUserArgs,
      context: ApolloContext
    ): Promise<ConfirmPayload> => {
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
