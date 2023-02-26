import { authGQLResolver } from './auth/auth.resolver';
import { authTypeDefs } from './auth/auth.schema';
import { projectGQLResolver } from './project/project.resolver';
import { projectTypeDefs } from './project/project.schema';
import { sprintTypeDefs } from './sprint/sprint.schema';
import { ticketGQLResolvers } from './ticket/ticket.resolver';
import { ticketTypeDefs } from './ticket/ticket.schema';
import { userGQLResolver } from './user/user.resolver';
import { userTypeDefs } from './user/user.schema';

const BASE_TYPE_DEF = `#graphql
 type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  type UserError {
    message: String!
    values: [String]
  }

`;

export const typeDefs = [
  BASE_TYPE_DEF,
  ticketTypeDefs,
  projectTypeDefs,
  userTypeDefs,
  authTypeDefs,
  sprintTypeDefs,
];

const { Query: ticketQueries, Mutations: ticketMutations } = ticketGQLResolvers;
const {
  Query: projectQueries,
  Mutations: projectMutations,
  Project,
} = projectGQLResolver;
const { Query: userQueries, User } = userGQLResolver;
const { Query: authQueries, Mutation: authMutations } = authGQLResolver;

export const resolvers = {
  Query: {
    ...userQueries,
    ...projectQueries,
    ...ticketQueries,
    ...authQueries,
  },
  Mutation: {
    ...authMutations,
    ...ticketMutations,
    ...projectMutations,
  },
  User,
  Project,
};
