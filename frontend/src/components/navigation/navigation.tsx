import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

export const Navigation = () => {
  const authContext = useContext(AuthContext);
  const isUser = authContext.user;

  return (
    <div>
      <ul>
        <li>Home</li>
        {isUser ? (
          <>
            <li>Profile</li>
            <li>Projects</li>
          </>
        ) : (
          <>
            <li>Login</li>
            <li>Register</li>
          </>
        )}
      </ul>
    </div>
  );
};
