import { useContext } from 'react';
import {
  AiOutlineFundProjectionScreen,
  AiOutlineHome,
  AiOutlineUser,
} from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';
import styled from 'styled-components';
import { breakPoints, theme } from '../../assets/theme';
import UserContext from '../../context/user';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useModal } from '../../hooks/use-modal.hook';
import { ERoutePath } from '../../types/enums/routes.enum';
import { LogoutForm } from '../logout-form/logout-form';
import { Content } from '../main-content/main-content';
import { NavigationItem } from './navigation-item';

const Nav = styled.nav({
  display: 'flex',
  justifyContent: 'center',
  background: theme.colors.G10,
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
  alignItems: 'center',
});

const LogOutBtn = styled.div({
  display: 'flex',
  padding: '1rem',
  cursor: 'pointer',
  ':hover': {
    background: theme.colors.G40,
  },
});

export const Navigation = () => {
  const {
    userState: { user },
  } = useContext(UserContext);

  const { toggle, isOpen } = useModal();

  return (
    <>
      {isOpen && <LogoutForm toggle={toggle} />}
      <Nav>
        <Content>
          <NavigationItem to={ERoutePath.HOME}>
            <AiOutlineHome size={20} />
            <p>{translate(TEXT.pages.home.name)}</p>
          </NavigationItem>
          {user ? (
            <Div>
              <NavigationItem to={ERoutePath.PROJECTS}>
                <AiOutlineFundProjectionScreen size={20} />
                <p>{translate(TEXT.pages.projects.name)}</p>
              </NavigationItem>

              <NavigationItem to={ERoutePath.PROFILE}>
                <AiOutlineUser size={20} />
                <p>{translate(TEXT.pages.profile.name)}</p>
              </NavigationItem>
              <LogOutBtn onClick={toggle}>
                <TbLogout color='white' size={20} />
              </LogOutBtn>
            </Div>
          ) : (
            <Div>
              <NavigationItem to={ERoutePath.LOGIN}>
                <p>{translate(TEXT.pages.login.name)}</p>
              </NavigationItem>
              <NavigationItem to={ERoutePath.SIGNUP}>
                <p>{translate(TEXT.pages.signup.name)}</p>
              </NavigationItem>
            </Div>
          )}
        </Content>
      </Nav>
    </>
  );
};
