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
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
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
          {translate(TEXT.buttons.cancelBtn)}
        </Button>
        <Button
          type='button'
          variant='success'
          style={{ width: '50%' }}
          onClick={logout}
        >
          {translate(TEXT.buttons.logOutBtn)}
        </Button>
      </Modal>
      <Nav>
        <Content>
          <NavigationItem to={RoutePath.HOME}>
            <AiOutlineHome size={20} />
            <p>{translate(TEXT.pages.home.name)}</p>
          </NavigationItem>
          {user ? (
            <Div>
              <NavigationItem to={RoutePath.PROJECTS}>
                <AiOutlineFundProjectionScreen size={20} />
                <p>{translate(TEXT.pages.projects.name)}</p>
              </NavigationItem>

              <NavigationItem to={RoutePath.PROFILE}>
                <AiOutlineUser size={20} />
                <p>{translate(TEXT.pages.profile.name)}</p>
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
                <p>{translate(TEXT.pages.login.name)}</p>
              </NavigationItem>
              <NavigationItem to={RoutePath.SIGNUP}>
                <p>{translate(TEXT.pages.signup.name)}</p>
              </NavigationItem>
            </Div>
          )}
        </Content>
      </Nav>
    </>
  );
};
