import React, { useState } from 'react';
import { Category } from '@/components/button/Button';
import IconButton from '@/components/iconButton/IconButton';
import UploadModal from './UploadModal';

const UploadButton: React.FC = () => {
    const [isModalShowing, setIsModalShowing] = useState(false);

    return (<>
        <IconButton
            category={Category.info}
            onClick={setIsModalShowing}
            icon="bi bi-cloud-upload"
        />
        <UploadModal
            isShowing={isModalShowing}
            setIsShowing={setIsModalShowing}
            data-testid="uploadModal" />
    </>);
};

export default UploadButton;    