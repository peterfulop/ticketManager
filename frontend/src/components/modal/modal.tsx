import styled from 'styled-components';
import { IReact } from '../../types/interfaces/common.interface';

interface ModalType extends IReact {
  isOpen: boolean;
  enabledOverlayClose: boolean;
  toggle: () => void;
}

const ModalBox = styled.div({
  '.modal-overlay': {
    zIndex: 9999,
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '.modal-box': {
    display: 'block',
    background: 'white',
    width: '50%',
    height: '50%',
    padding: '1rem',
    borderRadius: '1rem',
    transition: 'transform 0.25s ease',
  },
  '.scale': {
    transform: 'scale(1.01)',
  },
});

export default function Modal(props: ModalType) {
  return (
    <ModalBox>
      {props.isOpen && (
        <div
          className='modal-overlay'
          onClick={(event) => {
            if (props.enabledOverlayClose) {
              props.toggle();
            } else {
              const modalBox = document.querySelector('.modal-box');
              if (event.target === event.currentTarget) {
                modalBox?.classList.add('scale');
                setTimeout(() => {
                  modalBox?.classList.remove('scale');
                }, 100);
              }
            }
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className='modal-box'
          >
            {props.children}
          </div>
        </div>
      )}
    </ModalBox>
  );
}
