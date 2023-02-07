import { ApolloContext } from '../../apollo';
import {
  GetUserPayload,
  Project,
  QueryGetUserArgs,
  ResolversParentTypes,
  Ticket,
} from '../../types/graphql-generated/graphql';
import { getProjectsByUserIdUseCase } from '../../use-case/project-use-case/get-projects-by-user.use-case';
import { getTicketssByUserIdUseCase } from '../../use-case/ticket-use-case/get-tickets-by-user.use-case';
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
  User: {
    projects: async (
      parent: ResolversParentTypes['Project'],
      _args: any,
      context: ApolloContext
    ): Promise<Project> => {
      return await getProjectsByUserIdUseCase({ parent, context });
    },
    tickets: async (
      parent: ResolversParentTypes['Ticket'],
      _args: any,
      context: ApolloContext
    ): Promise<Ticket> => {
      return await getTicketssByUserIdUseCase({ parent, context });
    },
  },
};
