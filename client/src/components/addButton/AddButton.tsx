import React from 'react';
import ButtonWrapper from '../button/Button';

import styles from './AddButton.module.css';

const AddButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => <ButtonWrapper
    data-testid="AddButton"
    type="submit"
    className={styles.submit}
    value="Add"
    onClick={onClick}
/>

export default AddButton;