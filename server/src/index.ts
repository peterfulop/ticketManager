import { createApolloServer } from './apollo';

const startServer = async (): Promise<void> => {
 await createApolloServer();
  // console.log(`🚀 Server ready at ${url}`);
};

startServer();
