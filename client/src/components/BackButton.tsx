import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './button/Button';
import IconButton from './iconButton/IconButton';

type props = {
    path: string;
};

const BackButton: React.FC<props> = ({ path }) => {
    const navigate = useNavigate();
    return <IconButton
        icon='bi bi-backspace'
        onClick={() => {
            navigate(path)
        }} />
}

export default BackButton;