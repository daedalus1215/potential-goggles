import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '../iconButton/IconButton';

import styles from './TagButton.module.css';

const TagButton = () => {
    const navigate = useNavigate();
    return <IconButton
        icon="bi bi-tag"
        title="Note tags"
        className={styles.tagButton}
        onClick={() => {
            navigate("/tags");
        }}
    />
};

export default TagButton;