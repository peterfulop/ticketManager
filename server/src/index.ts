import { createApolloServer } from './apollo';

const startServer = async (): Promise<void> => {
  await createApolloServer();
};

startServer();
