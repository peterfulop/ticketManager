import { useEffect, useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { initialUserState, userReducer } from '../context/user';
import { Validate } from '../modules/validate';

export const useTokenValidation = () => {
  const location = useLocation();
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('useLocation to validation');
    CheckLocalStorageForCredentials();
  }, [location]);

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
