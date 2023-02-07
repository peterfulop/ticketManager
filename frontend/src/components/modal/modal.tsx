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
  paddingTop: '2rem',
  alignItems: 'center',
});

const ModalBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  background: 'white',
  padding: '1rem',
  borderRadius: '.5rem',
  transition: 'transform 0.25s ease',
});

const ModalBoxTitle = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const ModalBoxContent = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
  width: '100%',
  marginTop: '1rem',
  paddingTop: '1rem',
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
  title?: string;
  positionTop?: boolean;
  modalStyle?: {
    width?: string | number;
    height?: string | number;
  };
}

const ModalOverlayPositionTop: React.CSSProperties = {
  justifyContent: 'center',
  paddingTop: '5rem',
  alignItems: 'flex-start',
};

export const Modal = (props: ModalType) => {
  return (
    <ModalContainer>
      {props.isOpen && (
        <ModalOverlay
          style={props?.positionTop ? ModalOverlayPositionTop : undefined}
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
            style={{
              width: props?.modalStyle?.width || '80%',
              height: props?.modalStyle?.height || '80%',
            }}
          >
            <ModalBoxTitle>
              <h2>{props.title}</h2>
              <CloseButton onClick={props.toggle} title='close window'>
                <GrClose />
              </CloseButton>
            </ModalBoxTitle>
            <ModalBoxContent>{props.children}</ModalBoxContent>
          </ModalBox>
        </ModalOverlay>
      )}
    </ModalContainer>
  );
};
