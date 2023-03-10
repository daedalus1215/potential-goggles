import React from 'react';
import Modal from './modal/Modal';
import DropZone from './DropZone/DropZone';

type props = {
    isShowing: boolean;
    setIsShowing: (isShowing: boolean) => void;
}

const UploadModal: React.FC<props> = ({ isShowing, setIsShowing }) => {
    return isShowing
        ? (<Modal setIsShowing={setIsShowing} >
            <DropZone onClick={setIsShowing} />
        </Modal>)
        : <React.Fragment></React.Fragment>;
};

export default UploadModal;