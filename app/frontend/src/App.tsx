import { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthRoute } from './components/auth-route/auth-route';
import routes from './config/routes';
import { AuthContext, AuthProvider } from './context/auth-context';
// import { Validate } from './modules/validate';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const authContext = useContext(AuthContext);

  // useEffect(() => {
  //   const checkLocalStorageForCredentials = async () => {
  //     setLoading(false);
  //     const token = localStorage.getItem('token');
  //     if (token === null) {
  //       authContext.logout();
  //     } else {
  //       return Validate({
  //         token,
  //         callback: (error, user) => {
  //           if (error) {
  //             authContext.logout();
  //           } else if (user) {
  //             authContext.login({ user, token });
  //             setLoading(false);
  //           }
  //         },
  //       });
  //     }
  //   };
  //   checkLocalStorageForCredentials();
  // }, []);

  return (
    <AuthProvider>
      <Routes>
        {routes.map((route, index) => {
          if (route.auth) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AuthRoute>
                    <route.component />
                  </AuthRoute>
                }
              />
            );
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          );
        })}
      </Routes>
    </AuthProvider>
  );
}

export default App;
