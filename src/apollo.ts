import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers, typeDefs } from './graphql';
import { JWTVerify } from './helpers/jwt';

import type Prisma from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { config } from './config/config';

export const prisma = new PrismaClient();

export interface ApolloContext {
  prisma: Prisma.PrismaClient<
    Prisma.Prisma.PrismaClientOptions,
    never,
    | Prisma.Prisma.RejectOnNotFound
    | Prisma.Prisma.RejectPerOperation
    | undefined
  >;
  user: { userId: string } | null;
}

export const createApolloServer = async () => {
  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      const user = JWTVerify(token);
      return {
        prisma,
        user,
        token,
      };
    },
    listen: { port: config.backendPort },
  });

  return { url };
};
