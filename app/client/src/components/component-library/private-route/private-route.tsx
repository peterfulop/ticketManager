import { Navigate, Outlet } from 'react-router-dom';
import { NavigationPath } from '../../../enums/navigation.enum';

export const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  console.log(token);

  return token ? <Outlet /> : <Navigate to={NavigationPath.SIGNIN} />;
};
