import { useEffect, useReducer, useState } from 'react';
import { initialUserState, userReducer } from '../context/user';
import { Validate } from '../modules/validate';

export const useTokenValidation = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    CheckLocalStorageForCredentials();
  }, []);

  const CheckLocalStorageForCredentials = async () => {
    const token = localStorage.getItem('token');
    if (token === null) {
      userDispatch({
        type: 'logout',
        payload: initialUserState,
      });
      setLoading(false);
    } else {
      return await Validate({
        token,
        callback: (error, user) => {
          if (error) {
            userDispatch({
              type: 'logout',
              payload: initialUserState,
            });
            setLoading(false);
          } else if (user) {
            userDispatch({
              type: 'login',
              payload: { user, token },
            });
            setLoading(false);
          }
        },
      });
    }
  };

  const userContextValues = {
    userState,
    userDispatch,
  };

  return { userContextValues, loading, CheckLocalStorageForCredentials };
};
