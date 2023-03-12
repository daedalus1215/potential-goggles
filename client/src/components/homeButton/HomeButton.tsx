import React from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button } from '..';

import styles from './HomeButton.module.css';

const HomeButton: React.FC = () => {
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