import React from 'react';
import Button from '../button/Button';

import styles from './AddButton.module.css';

const AddButton: React.FC = () => <Button
    type="submit"
    className={styles.submit}
    value="Add"
/>

export default AddButton;