import { createApolloServer } from './apollo';

const startServer = async (): Promise<void> => {
  const { url } = await createApolloServer();
  console.log(`🚀 Server ready at ${url}`);
};

startServer();
