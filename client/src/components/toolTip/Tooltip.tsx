import React from 'react';
import styles from './Tooltip.module.css';

interface props {
    children: any;
    hover: any;
};

const Tooltip: React.FC<props> = ({ children, hover }) => {
    return <div className={styles.tooltip}>
        {children}
        <span className={styles.tooltiptext}>{hover}</span>
    </div>
}

export default Tooltip;