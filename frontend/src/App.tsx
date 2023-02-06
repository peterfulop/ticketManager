import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { AuthRoute } from './components/auth-route/auth-route';
import { Navigation } from './components/navigation/navigation';
import routes from './config/routes';
import { UserContextProvider } from './context/user';
import { useTokenValidation } from './hooks/use-token-validation';

function App() {
  const { userContextValues, loading } = useTokenValidation();

  return (
    <UserContextProvider value={userContextValues}>
      <Navigation />
      {!loading && (
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
      )}
    </UserContextProvider>
  );
}

export default App;
