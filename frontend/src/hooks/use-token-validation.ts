import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import { Validate } from '../modules/validate';

export const useTokenValidation = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const authContext = useContext(AuthContext);

  useEffect(() => {
    checkLocalStorageForCredentials();
  }, []);

  const checkLocalStorageForCredentials = async () => {
    setLoading(false);
    setError('');
    const token = localStorage.getItem('token');
    if (token === null) {
      authContext.logout();
      ('No token! pleasse, log in!');
    } else {
      return Validate({
        token,
        callback: (error, user) => {
          if (error) {
            authContext.logout();
            setError('No token! pleasse, log in!');
          } else if (user) {
            console.log('logging is ok');

            authContext.login({ user, token });
            setLoading(false);
          }
        },
      });
    }
  };

  return { loading, error, checkLocalStorageForCredentials };
};
