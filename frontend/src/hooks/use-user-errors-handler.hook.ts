import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { useContext, useEffect, useState } from 'react';
import { UserError } from '../apollo/graphql-generated/types';
import UserContext, { initialUserState } from '../context/user';
import { EServerSideError } from '../types/enums/db-errors.enum';

export const useUserErrorHandler = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [notFound, setNotFound] = useState<boolean>(false);
  const userContext = useContext(UserContext);

  const logout = () => {
    userContext.userDispatch({ type: 'logout', payload: initialUserState });
  };

  const checkErrorMessage = (input: {
    userErrors?: UserError[];
    graphqlError?: ApolloError | GraphQLError;
  }) => {
    const { userErrors, graphqlError } = input;
    const error =
      userErrors && userErrors.length > 0
        ? userErrors[0].message
        : graphqlError?.message;
    if (error) setErrorMessage(error);
  };

  useEffect(() => {
    switch (errorMessage) {
      case EServerSideError.AUTHORIZATION_FAILED:
        logout();
        break;
      case EServerSideError.MISSING_RECORD:
        setNotFound(true);
        break;
    }
  }, [errorMessage]);

  return { errorMessage, notFound, checkErrorMessage };
};
