import { FC } from 'react';
import ReactDOM from 'react-dom';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import { IReact } from '../../types/interfaces/common.interface';

const BackdropDiv = styled.div({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100vh',
  zIndex: ' 20',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
});

const ModalContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
  height: '100vh',
  position: 'absolute',
  padding: '2rem',
  '.scale': {
    transform: 'scale(1.01)',
  },
});

const ModalBox = styled.div({
  width: '100%',
  marginTop: '2rem',
  padding: '1rem',
  maxWidth: '500px',
  backgroundColor: 'white',
  borderRadius: '8px',
  zIndex: '30',
});

const ModalHeading = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  h4: {
    margin: 0,
  },
});

const CloseButton = styled.button({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  background: 'none',
  fontSize: '20px',
  transition: 'transform 0.25s ease',
  margin: 0,
  padding: '.5rem',
  ':hover': {
    cursor: 'pointer',
    transform: 'scale(1.25)',
  },
});

interface IBackdrop {
  toggle: () => void;
  closeOnBackdrop: boolean;
  callBackFn?: () => void;
}

const Backdrop: FC<IBackdrop> = ({ toggle, callBackFn, closeOnBackdrop }) => {
  return (
    <BackdropDiv
      onClick={(event) => {
        if (closeOnBackdrop) {
          callBackFn && callBackFn();
          toggle();
        } else {
          const modalBox = document.getElementById('modal-box');

          if (event.target === event.currentTarget) {
            modalBox?.classList.add('scale');
            setTimeout(() => {
              modalBox?.classList.remove('scale');
            }, 100);
          }
        }
      }}
    />
  );
};

const portalElement = document.getElementById('overlays') as HTMLElement;

interface IModal extends IReact {
  toggle: () => void;
  children: React.ReactNode;
  closeOnBackdrop: boolean;
  title?: string;
  maxWidth?: string;
  callBackFn?: () => void;
}

export const Modal: FC<IModal> = ({
  toggle,
  children,
  closeOnBackdrop,
  title,
  maxWidth,
  callBackFn,
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          closeOnBackdrop={closeOnBackdrop}
          toggle={toggle}
          callBackFn={callBackFn}
        />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalContainer>
          <ModalBox id='modal-box' style={{ maxWidth }}>
            <ModalHeading>
              <h4>{title}</h4>
              <CloseButton
                onClick={() => {
                  callBackFn && callBackFn();
                  toggle();
                }}
                title='close window'
              >
                <GrClose />
              </CloseButton>
            </ModalHeading>
            {children}
          </ModalBox>
        </ModalContainer>,
        portalElement
      )}
    </>
  );
};
