import { useContext, useEffect, useState } from 'react';
import UserContext, { initialUserState } from '../context/user';
import { EServerSideError } from '../types/enums/db-errors.enum';

export const useUserAuthentication = () => {
  const [msg, setMsg] = useState<string>('');

  const userContext = useContext(UserContext);
  const logout = () => {
    userContext.userDispatch({ type: 'logout', payload: initialUserState });
  };

  const checkErrorMessage = (error: string) => {
    setMsg(error);
  };

  useEffect(() => {
    if (msg === EServerSideError.AUTHORIZATION_FAILED) {
      logout();
    }
  }, [msg]);

  return { msg, checkErrorMessage };
};
