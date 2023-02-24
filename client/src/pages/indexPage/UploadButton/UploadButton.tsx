import React, { useState } from 'react';
import IconButton from '../../../components/iconButton/IconButton';
import UploadModal from './UploadModal';

const UploadButton = () => {
    const [isModalShowing, setIsModalShowing] = useState(false);

    return (<>
        <IconButton
            onClick={setIsModalShowing}
            icon="bi bi-cloud-upload"
            title="Upload"
        />
        <UploadModal
            isShowing={isModalShowing}
            setIsShowing={setIsModalShowing}
            data-testid="uploadModal" />
    </>);
};

export default UploadButton;    