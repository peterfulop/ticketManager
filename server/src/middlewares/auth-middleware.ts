import { ApolloContext } from '../apollo';
import { DBErrorMessages } from '../enum/db-error-messages.enum';

export const authMiddleware = (context: ApolloContext) => {
  if (!context.user) {
    throw new Error(DBErrorMessages.AUTHORIZATION_FAILED);
  }
};
