import { useContext } from 'react';
import styled from 'styled-components';
import { theme } from '../../assets/theme';
import UserContext from '../../context/user';
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
  const { user } = useContext(UserContext).userState;

  return (
    <Nav>
      <Content>
        <NavigationItem to={RoutePath.HOME}>Home</NavigationItem>
        {user ? (
          <Div>
            <NavigationItem to={RoutePath.PROFILE}>Profile</NavigationItem>
            <NavigationItem to={RoutePath.PROJECTS}>Projects</NavigationItem>
          </Div>
        ) : (
          <Div>
            <NavigationItem to={RoutePath.SIGNIN}>Login</NavigationItem>
            <NavigationItem to={RoutePath.SIGNUP}>Register</NavigationItem>
          </Div>
        )}
      </Content>
    </Nav>
  );
};
