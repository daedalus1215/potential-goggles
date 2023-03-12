import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './button/Button';

type props = {
    path: string;
};

const BackButton: React.FC<props> = ({ path }) => {
    const navigate = useNavigate();
    return <Button
        onClick={() => {
            navigate(path)
        }}>
        <i className="bi bi-backspace"></i>
    </Button>
}

export default BackButton;