import classNames from 'classnames';
import React from 'react';
import Button from '../button/Button';

import styles from './SaveButton.module.css';

interface props {
    className?: string;
}

const SaveButton: React.FC<props> = ({ className }) => <Button
    type="submit"
    className={classNames(styles.submit, className)}
    value="Save Form"
/>

export default SaveButton;