import { FC, useContext } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import UserContext, { initialUserState } from '../../context/user';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { Modal } from '../component-library/modal/modal';

const Div = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  div: {
    marginTop: '1rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
  },
});

interface ILogout {
  toggle: () => void;
}

export const LogoutForm: FC<ILogout> = ({ toggle }) => {
  const userContext = useContext(UserContext);
  const logout = () => {
    userContext.userDispatch({ type: 'logout', payload: initialUserState });
    toggle();
  };

  return (
    <Modal toggle={toggle} closeOnBackdrop={false} title='Logging out'>
      <Div>
        <div>
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
        </div>
      </Div>
    </Modal>
  );
};
