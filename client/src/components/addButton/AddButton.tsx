import React from 'react';
import Button from '../button/Button';

import styles from './AddButton.module.css';

const AddButton: React.FC = () => <Button
    type="submit"
    className={styles.submit}
    // className={cn(styles.submit, "glyphicon glyphicon-floppy-save")}
    // onClick={() => {
    //     document.getElementById(name)
    //         ?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    // }}
    value="Add"
/>

export default AddButton;