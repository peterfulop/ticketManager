import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import { IReact } from '../../types/interfaces/common.interface';

const ModalContainer = styled.div({
  '.scale': {
    transform: 'scale(1.01)',
  },
});

const ModalOverlay = styled.div({
  zIndex: 9999,
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  background: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ModalBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'white',
  width: '80%',
  height: '80%',
  padding: '1rem',
  borderRadius: '1rem',
  transition: 'transform 0.25s ease',
});

const ModalBoxTitle = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const ModalBoxContent = styled.div({
  display: 'flex',
});

const ModalBoxFooter = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
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

interface ModalType extends IReact {
  isOpen: boolean;
  enabledOverlayClose: boolean;
  toggle: () => void;
  width?: string;
  height?: string;
  title?: string;
}

export const Modal = (props: ModalType) => {
  return (
    <ModalContainer style={{ width: props.width, height: props.height }}>
      {props.isOpen && (
        <ModalOverlay
          onClick={(event) => {
            if (props.enabledOverlayClose) {
              props.toggle();
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
        >
          <ModalBox
            onClick={(e) => {
              e.stopPropagation();
            }}
            id='modal-box'
          >
            <ModalBoxTitle>
              <h2>Ticket description 1</h2>
              <CloseButton onClick={props.toggle} title='close window'>
                <GrClose />
              </CloseButton>
            </ModalBoxTitle>
            <ModalBoxContent>{props.children}</ModalBoxContent>
            <ModalBoxFooter></ModalBoxFooter>
          </ModalBox>
        </ModalOverlay>
      )}
    </ModalContainer>
  );
};
