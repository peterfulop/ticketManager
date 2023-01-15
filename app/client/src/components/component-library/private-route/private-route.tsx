import { Navigate, Outlet } from 'react-router-dom';
import { NavigationPath } from '../../../enums/navigation.enum';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
// import { useGetMyProfileQuery } from '../../common-queries/common-queries.generated';

export const PrivateRoute = () => {
  const authToken = localStorage.getItem('token');

  const [cookie, _setCookie] = useCookies(['ticket-manager-session']);
  console.log(cookie);

  // const { data } = useGetMyProfileQuery({
  //   fetchPolicy: 'no-cache',
  // });

  // if (authToken) {
  //   if (data?.getMyProfile.user) {
  //     return <Outlet />;
  //   }
  // }

  return cookie ? <Outlet /> : <Navigate to={NavigationPath.SIGNIN} />;
};
