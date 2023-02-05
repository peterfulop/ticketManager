import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../assets/theme';
import UserContext, { initialUserState } from '../../context/user';
import { RoutePath } from '../../types/enums/routes.enum';
import { Content } from '../main-content/main-content';
import { NavigationItem } from './navigation-item';

const Nav = styled.nav({
  display: 'flex',
  justifyContent: 'center',
  background: theme.colors.G10,
  a: {
    textDecoration: 'none',
    color: theme.colors.primary,
    padding: '1rem',
    ':hover': {
      background: theme.colors.G40,
    },
  },
  '.link-active': {
    background: theme.colors.G40,
  },
});

const Div = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

export const Navigation = () => {
  const {
    userState: { user },
  } = useContext(UserContext);
  const userContext = useContext(UserContext);

  const logout = () => {
    userContext.userDispatch({ type: 'logout', payload: initialUserState });
  };

  return (
    <Nav>
      <Content>
        <NavigationItem to={RoutePath.HOME}>Home</NavigationItem>
        {user ? (
          <Div>
            <NavigationItem to={RoutePath.PROFILE}>Profile</NavigationItem>
            <NavigationItem to={RoutePath.PROJECTS}>Projects</NavigationItem>
            <Link to={RoutePath.HOME} onClick={logout}>
              Log Out
            </Link>
          </Div>
        ) : (
          <Div>
            <NavigationItem to={RoutePath.LOGIN}>LogIn</NavigationItem>
            <NavigationItem to={RoutePath.SIGNUP}>Register</NavigationItem>
          </Div>
        )}
      </Content>
    </Nav>
  );
};
