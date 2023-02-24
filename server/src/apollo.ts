import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import type Prisma from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import http from 'http';
import morgan from 'morgan';
import { config } from './config/config';
import { resolvers, typeDefs } from './graphql';
import { JWTVerify } from './helpers/jwt';

export const prisma = new PrismaClient();

const app = express();
const httpServer = http.createServer(app);
app.use(morgan('dev'));

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

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  validationRules: [depthLimit(10)],
  introspection: process.env.NODE_ENV !== 'production',
});

export const createApolloServer = async () => {
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        const user = JWTVerify(token);
        return {
          prisma,
          user,
        };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer
      .listen({ port: config.server.port }, resolve)
      .setTimeout(1000 * 60 * 10)
  );
  console.log(
    `🚀 Server ready at http://localhost:${config.server.port}/graphql`
  );
};
