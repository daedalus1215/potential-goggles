import React from 'react';
import cn from 'classnames';

import styles from './HomeButton.module.css';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
    const navigate = useNavigate();
    return <Button
        className={cn(styles.buttonAdd)}
        onClick={() => {
            navigate("/");
        }}>
        <i className="bi bi-house"></i>
    </Button>
};

export default HomeButton;