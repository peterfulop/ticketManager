import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { resolvers, typeDefs } from './graphql';
import { JWTVerify } from './helpers/jwt';

import type Prisma from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { config } from './config/config';

export const prisma = new PrismaClient();

const app = express();
const httpServer = http.createServer(app);

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
    httpServer.listen({ port: config.server.port }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${config.server.port}/graphql`
  );
};

// export const createApolloServer = async () => {
//   const server = new ApolloServer<ApolloContext>({
//     typeDefs,
//     resolvers,
//   });

//   const { url } = await startStandaloneServer(server, {
//     context: async ({ req }) => {
//       const token = req.headers.authorization || '';
//       const user = JWTVerify(token);
//       console.log('user',user);
//       return {
//         prisma,
//         user,
//       };
//     },
//     listen: { port: config.backendPort },
//   });

//   return { url };
// };
