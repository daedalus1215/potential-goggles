import React from 'react';
import cn from 'classnames';
import Button from '../Button';

import styles from './IconButton.module.css';

interface props {
  onClick: any;
  icon: string;
  title: string;
  className?: string;
}
const IconButton: React.FC<props> = ({ onClick, icon, title, className}) => {

  return (<Button
    data-testid="icon-button"
    title={title}
    type="a"
    className={cn(styles.iconButton, className)}
    onClick={onClick}>
    <div className={styles.wrap}>
      <i className={cn(icon, styles.icon)}></i>
      <span className={styles.title}>{title}</span>
    </div>
  </Button>
  );
};

export default IconButton;
