import React from 'react';
import cn from 'classnames';

import styles from './IconButton.module.css';
import { ButtonWrapper } from '..';
import { Category } from '../button/Button';

interface props {
  onClick?: (e?: any) => void;
  icon: string;
  title?: string;
  className?: string;
  type?: string;
  form?: string;
  category?: keyof typeof Category
}
const IconButton: React.FC<props> = ({ onClick, icon, title, className, type, category, form }) => {

  return (<ButtonWrapper
    testid="icon-button"
    title={title}
    type={type ?? "a"}
    category={category}
    className={cn(styles.IconButton, className, { [styles.hasTitle]: title })}
    onClick={onClick}
    form={form}>
    <i className={cn(icon, styles.icon)}></i>
    {title && <span className={styles.title}>{title}</span>}

  </ButtonWrapper>
  );
};

export default IconButton;
