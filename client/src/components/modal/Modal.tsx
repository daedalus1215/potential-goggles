import React from 'react';
import { ButtonWrapper } from '@/components';
import styles from './Modal.module.css';

interface ModalProp {
  children?: any;
  setIsShowing: (isShowing: boolean) => void;
}

const Modal: React.FC<ModalProp> = ({ children, setIsShowing }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <ButtonWrapperWrapper
          className={styles.closeButton}
          onClick={() => setIsShowing(false)}
          value="X" 
        />
        {children && children}
      </div>
    </div>
  );
};

export default Modal;
