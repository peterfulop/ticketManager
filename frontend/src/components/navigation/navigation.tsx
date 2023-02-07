import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import {
  AiOutlineFundProjectionScreen,
  AiOutlineHome,
  AiOutlineUser,
} from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakPoints, theme } from '../../assets/theme';
import UserContext, { initialUserState } from '../../context/user';
import useModal from '../../hooks/use-modal.hook';
import { RoutePath } from '../../types/enums/routes.enum';
import { Content } from '../main-content/main-content';
import { Modal } from '../modal/modal';
import { NavigationItem } from './navigation-item';

const Nav = styled.nav({
  display: 'flex',
  justifyContent: 'center',
  background: theme.colors.G10,
  height: 62,
  a: {
    color: theme.colors.primary,
    textDecoration: 'none',
    padding: '1rem',
    ':hover': {
      background: theme.colors.G40,
    },
  },
  '.link-active': {
    background: theme.colors.G40,
  },
  p: {
    margin: 0,
    padding: 0,
    [`@media screen and (max-width: ${breakPoints.sm})`]: {
      display: 'none',
    },
  },
});

const Div = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

export const Navigation = () => {
  const { isOpen, toggle } = useModal();

  const {
    userState: { user },
  } = useContext(UserContext);
  const userContext = useContext(UserContext);

  const logout = () => {
    userContext.userDispatch({ type: 'logout', payload: initialUserState });
    toggle();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        enabledOverlayClose={true}
        title='Logging out?'
        modalStyle={{ width: 300, height: 'auto' }}
        positionTop={true}
      >
        <Button
          type='button'
          variant='secondary'
          style={{ width: '50%' }}
          onClick={toggle}
        >
          Back
        </Button>
        <Button
          type='button'
          variant='success'
          style={{ width: '50%' }}
          onClick={logout}
        >
          Log out
        </Button>
      </Modal>
      <Nav>
        <Content>
          <NavigationItem to={RoutePath.HOME}>
            <AiOutlineHome size={20} />
            <p>Home</p>
          </NavigationItem>
          {user ? (
            <Div>
              <NavigationItem to={RoutePath.PROJECTS}>
                <AiOutlineFundProjectionScreen size={20} />
                <p>Projects</p>
              </NavigationItem>

              <NavigationItem to={RoutePath.PROFILE}>
                <AiOutlineUser size={20} />
                <p>Profile</p>
              </NavigationItem>
              <Link
                to={RoutePath.HOME}
                onClick={toggle}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TbLogout color='white' size={20} />
              </Link>
            </Div>
          ) : (
            <Div>
              <NavigationItem to={RoutePath.LOGIN}>
                <p>LogIn</p>
              </NavigationItem>
              <NavigationItem to={RoutePath.SIGNUP}>
                <p>Register</p>
              </NavigationItem>
            </Div>
          )}
        </Content>
      </Nav>
    </>
  );
};
