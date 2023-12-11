import React from 'react';
import Button from '../button/Button';

import styles from './LabelButton.module.css';

export const LabelButton: React.FC<{ onClick?: () => void, value: string }> = ({ onClick, value }) => <Button
    type="submit"
    className={styles.submit}
    value={value}
    onClick={onClick}
/>
