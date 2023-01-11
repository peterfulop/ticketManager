import { ApolloContext } from '../../apollo';
import {
  GetUserPayload,
  QueryGetUserArgs,
} from '../../types/graphql-generated/graphql';
import { getMyProfileUseCase } from '../../use-case/user-use-case/get-my-profile.use-case';
import { getUserUseCase } from '../../use-case/user-use-case/get-user.use-case';

export const userGQLResolver = {
  Query: {
    getUser: async (
      _parent: any,
      args: QueryGetUserArgs,
      context: ApolloContext
    ): Promise<GetUserPayload> => {
      return await getUserUseCase({ args, context });
    },
    getMyProfile: async (
      _parent: any,
      _args: any,
      context: ApolloContext
    ): Promise<GetUserPayload> => {
      return await getMyProfileUseCase({ context });
    },
  },
};
