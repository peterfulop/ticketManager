import { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { RoutePath } from '../../types/enums/routes.enum';
import { IReact } from '../../types/interfaces/common.interface';

export interface IAuthRouteProps extends IReact {}

export const AuthRoute: FC<IAuthRouteProps> = (props) => {
  const { children } = props;
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to={RoutePath.SIGNIN} />;
  } else {
    return <>{children}</>;
  }
};
