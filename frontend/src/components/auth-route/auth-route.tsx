import { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../context/user';
import { ERoutePath } from '../../types/enums/routes.enum';
import { IReact } from '../../types/interfaces/common.interface';

export interface IAuthRouteProps extends IReact {}

export const AuthRoute: FC<IAuthRouteProps> = (props) => {
  const { children } = props;
  const { user } = useContext(UserContext).userState;

  if (!user) {
    return <Navigate to={ERoutePath.LOGIN} />;
  } else {
    return <>{children}</>;
  }
};
