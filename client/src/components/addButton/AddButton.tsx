import React from 'react';
import Button from '../button/Button';

import styles from './AddButton.module.css';

const AddButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => <Button
    type="submit"
    className={styles.submit}
    value="Add"
    onClick={onClick}
/>

export default AddButton;