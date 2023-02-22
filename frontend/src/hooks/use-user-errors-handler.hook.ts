import { useContext, useEffect, useState } from 'react';
import UserContext, { initialUserState } from '../context/user';
import { EServerSideError } from '../types/enums/db-errors.enum';

export const useUserErrorsHandler = () => {
  const [msg, setMsg] = useState<string>('');
  const [notFound, setNotFound] = useState<boolean>(false);
  const userContext = useContext(UserContext);

  const logout = () => {
    userContext.userDispatch({ type: 'logout', payload: initialUserState });
  };

  const checkErrorMessage = (error: string) => {
    setMsg(error);
  };

  useEffect(() => {
    switch (msg) {
      case EServerSideError.AUTHORIZATION_FAILED:
        logout();
        break;
      case EServerSideError.MISSING_RECORD:
        setNotFound(true);
        break;
    }
  }, [msg]);

  return { msg, notFound, checkErrorMessage };
};
