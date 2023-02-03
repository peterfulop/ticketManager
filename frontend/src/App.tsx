import { Route, Routes } from 'react-router-dom';
import { AuthRoute } from './components/auth-route/auth-route';
import { Navigation } from './components/navigation/navigation';
import routes from './config/routes';
import { AuthProvider } from './context/auth-context';
import { useTokenValidation } from './hooks/use-token-validation';

function App() {
  const { error } = useTokenValidation();
  return (
    <AuthProvider>
      <Navigation />
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
