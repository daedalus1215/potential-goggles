import React, { useState } from 'react';
import Button from '../../../components/button/Button';
import cn from 'classnames';
import UploadModal from './UploadModal';

import styles from './UploadButton.module.css';
import classNames from 'classnames';

const UploadButton = () => {
    const [isModalShowing, setIsModalShowing] = useState(false);

    return (<>
        <Button
            className={cn(styles.uploadButton)}
            onClick={setIsModalShowing}>
            <div className={styles.wrap}>
                <i className={classNames("bi bi-cloud-upload", styles.icon)}></i>
                <span className={styles.title}>Upload File</span>
            </div>
        </Button>
        <UploadModal
            isShowing={isModalShowing}
            setIsShowing={setIsModalShowing}
            data-testid="uploadModal" />
    </>);
};

export default UploadButton;    