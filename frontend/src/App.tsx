import { Route, Routes } from 'react-router-dom';
import { AuthRoute } from './components/auth-route/auth-route';
import { Modal } from './components/modal/modal';
import { Navigation } from './components/navigation/navigation';
import routes from './config/routes';
import { UserContextProvider } from './context/user';
import useModal from './hooks/use-modal.hook';
import { useTokenValidation } from './hooks/use-token-validation';

function App() {
  const { userContextValues } = useTokenValidation();
  const { isOpen, toggle } = useModal();

  return (
    <UserContextProvider value={userContextValues}>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        enabledOverlayClose={false}
      ></Modal>
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
    </UserContextProvider>
  );
}

export default App;
