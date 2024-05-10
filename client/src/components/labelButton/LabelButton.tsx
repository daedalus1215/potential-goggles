import React from 'react';
import ButtonWrapper from '../button/Button';
import cn from 'classnames';
import styles from './LabelButton.module.css';

export const LabelButton: React.FC<{ onClick?: () => void, value: string, classNames?:string }> = ({ onClick, value, classNames }) => <ButtonWrapperWrapper
    type="submit"
    className={cn(styles.submit, classNames)}
    value={value}
    onClick={onClick}
/>
