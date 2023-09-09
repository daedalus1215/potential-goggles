import React, { MouseEventHandler } from 'react';
import cn from 'classnames';
import useRippleEffect from './useRippleEffect/useRippleEffect';

import styles from './Button.module.css';

export const Category = {
  'primary': 'primary',
  'primary2nd': 'primary2nd',
  'danger': 'danger',
  'info': 'info',
  'accent': 'accent'
} as const;

interface ButtonProps {
  className?: string;
  onClick?: (e?: MouseEventHandler<HTMLButtonElement>) => void;
  value?: string | number;
  children?: any;
  testid?: string;
  title?: string;
  type?: string;
  disabled?: boolean;
  category?: keyof typeof Category;
  form?: string;
}

const Button: React.FC<ButtonProps> = ({ className, onClick, value, children, testid, title, type, disabled, category, ...rest }) => {
  const clickCallback = useRippleEffect('button', onClick || (() => { }));
  let categoryClass = {};
  switch (category) {
    case Category.info:
      categoryClass = { [styles.info]: true }
      break;
    case Category.primary:
      categoryClass = { [styles.primary]: true }
      break;
    case Category.primary2nd:
      categoryClass = { [styles.primary2nd]: true }
      break;
    case Category.danger:
      categoryClass = { [styles.danger]: true }
      break;
    case Category.accent:
      categoryClass = { [styles.accent]: true }
      break;
    default:
      categoryClass = {}
      break;
  }

  return (
    <button
      className={cn(styles.baseBtn, className, categoryClass)}
      onClick={clickCallback}
      data-testid={testid}
      disabled={disabled}
      {...rest}>
      {children}
      {value}
    </button>
  );
};

export default Button;
