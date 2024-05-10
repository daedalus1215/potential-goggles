import classNames from 'classnames';
import React from 'react';
import ButtonWrapper from '../button/Button';

import styles from './SaveButton.module.css';

interface props {
    className?: string;
}

const SaveButton: React.FC<props> = ({ className }) => <ButtonWrapper
    type="submit"
    className={classNames(styles.submit, className)}
    value="Save Form"
/>

export default SaveButton;