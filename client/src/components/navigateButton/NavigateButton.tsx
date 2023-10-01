import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '../iconButton/IconButton';

type props = {
    icon: string;
    url: string;
    style:string;
};

const NavigateButton: React.FC<props> = ({icon, url, style}) => {
    const navigate = useNavigate();
    return <IconButton
        icon={icon}
        className={style}
        onClick={() => {
            navigate(`/${url}`);
        }}
    />;
};

export default NavigateButton;